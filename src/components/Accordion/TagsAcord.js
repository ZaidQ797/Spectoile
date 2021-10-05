import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Accordion, Spacer, Input} from '../../components';
import {CheckBox} from 'react-native-elements';
import {WP, HP, family, size, colors, getSelections} from '../../utilities';
import {useSelector} from 'react-redux';
import I18n from '../../translation';

const TagsAcord = ({title, expanded, onToggle}) => {
  const [checkboxes, setCheckboxes] = useState(addListData?.tags);
  const [newTag, setNewTag] = useState('');

  const {addListData, addListObj} = useSelector((state) => state.listings);

  useEffect(() => {
    if (addListObj.tags?.length > 0) {
      setCheckboxes(getSelections(addListData.tags, addListObj.tags));
    } else {
      setCheckboxes(addListData.tags);
    }
    setNewTag(addListObj.new_tag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rendetItem = ({item, index}) => (
    <View key={index} style={styles.itemCotnainer}>
      <CheckBox
        containerStyle={styles.checkboxContainer}
        checked={item.selected}
        checkedColor={colors.p1}
        size={WP('5')}
        onPress={() => onCheck(item)}
      />
      <Text numberOfLines={1} style={styles.label}>
        {item.label}
      </Text>
    </View>
  );

  const onCheck = (item) => {
    let newArr = checkboxes.map((elem) => {
      if (elem.id === item.id) {
        return {
          ...elem,
          selected: !elem.selected,
        };
      }
      return elem;
    });
    setCheckboxes(newArr);
    addListData.tags = newArr;
    let apiArray = [];
    newArr?.filter((elem) => {
      if (elem.selected) {
        apiArray.push(elem.id);
      }
    });
    addListObj.tags = apiArray;
  };

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <Spacer />
      <View style={styles.body}>
        <Text style={styles.tagline}>{I18n.t('tag')}</Text>
        <Spacer />
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={checkboxes}
          renderItem={rendetItem}
          keyExtractor={(item, index) => item + index.toString()}
        />
        <Spacer />
        <Text style={styles.tagline}>{I18n.t('add_new_tag')}</Text>
        <Input
          onlyInput
          multiline={false}
          value={newTag}
          onChangeText={(text) => {
            setNewTag(text);
            addListObj.new_tag = text;
          }}
        />
        <Text style={styles.tagline}>{I18n.t('tags_input_sublable')}</Text>
        <Spacer />
      </View>
    </Accordion>
  );
};

const styles = StyleSheet.create({
  body: {
    marginHorizontal: WP('5.5'),
  },
  image: {
    width: WP('34'),
    height: HP('15'),
    marginRight: WP('5'),
    marginBottom: WP('5'),
    borderRadius: 5,
  },
  itemCotnainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginVertical: WP('1'),
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0,
  },
  label: {
    fontFamily: family.Montserrat_Regular,
    left: 2,
    fontSize: size.tiny,
    width: WP('30'),
  },
  tagline: {
    fontFamily: family.Montserrat_Regular,
    left: 2,
    fontSize: size.xtiny,
  },
});

export {TagsAcord};
