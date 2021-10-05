import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Accordion, Spacer} from '../../components';
import {CheckBox} from 'react-native-elements';
import {WP, HP, family, size, colors, getSelections} from '../../utilities';
import {useSelector} from 'react-redux';

const CategoryAcord = ({title, expanded, onToggle}) => {
  const {addListData, addListObj} = useSelector((state) => state.listings);

  useEffect(() => {
    if (addListObj.categories?.length > 0) {
      setCheckboxes(
        getSelections(addListData.categories, addListObj.categories),
      );
    } else {
      setCheckboxes(addListData.categories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [checkboxes, setCheckboxes] = useState(addListData.categories);

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
    addListData.categories = newArr;
    let apiArray = [];
    newArr?.filter((elem) => {
      if (elem.selected) {
        apiArray.push(elem.id);
      }
    });
    addListObj.categories = apiArray;
  };

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <Spacer />
      <View style={styles.body}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={checkboxes}
          renderItem={rendetItem}
          keyExtractor={(item, index) => item + index.toString()}
        />
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
});

export {CategoryAcord};
