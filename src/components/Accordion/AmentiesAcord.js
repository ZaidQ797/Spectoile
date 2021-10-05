import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {Accordion, Spacer} from '../../components';
import {CheckBox} from 'react-native-elements';
import {WP, HP, family, size, colors, getSelections} from '../../utilities';
import {useSelector} from 'react-redux';
import I18n from '../../translation';

const AmentiesAcord = ({title, expanded, onToggle}) => {
  const {addListData, addListObj} = useSelector((state) => state.listings);

  useEffect(() => {
    if (addListObj.included_amenities?.length > 0) {
      setIncluded(
        getSelections(addListData.inAmenities, addListObj.included_amenities),
      );
    } else {
      setIncluded(addListData.inAmenities);
    }
    if (addListObj.excluded_amenities?.length > 0) {
      setExcluded(
        getSelections(addListData.exAmenities, addListObj.excluded_amenities),
      );
    } else {
      setExcluded(addListData.exAmenities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [included, setIncluded] = useState(addListData.inAmenities);
  const [excluded, setExcluded] = useState(addListData.exAmenities);

  const rendetInItem = ({item, index}) => (
    <View key={index} style={styles.itemCotnainer}>
      <CheckBox
        containerStyle={styles.checkboxContainer}
        checked={item.selected}
        checkedColor={colors.p1}
        size={WP('5')}
        onPress={() => onIncludedCheck(item)}
      />
      <Text numberOfLines={1} style={styles.label}>
        {item.label}
      </Text>
    </View>
  );

  const rendetExItem = ({item, index}) => (
    <View key={index} style={styles.itemCotnainer}>
      <CheckBox
        containerStyle={styles.checkboxContainer}
        checked={item.selected}
        checkedColor={colors.p1}
        size={WP('5')}
        onPress={() => onExcludedCheck(item)}
      />
      <Text numberOfLines={1} style={styles.label}>
        {item.label}
      </Text>
    </View>
  );

  const onIncludedCheck = (item) => {
    let newArr = included.map((elem) => {
      if (elem.id === item.id) {
        return {
          ...elem,
          selected: !elem.selected,
        };
      }
      return elem;
    });
    setIncluded(newArr);
    addListData.inAmenities = newArr;
    let apiArray = [];
    newArr?.filter((elem) => {
      if (elem.selected) {
        apiArray.push(elem.id);
      }
    });
    addListObj.included_amenities = apiArray;
  };
  const onExcludedCheck = (item) => {
    let newArr = excluded.map((elem) => {
      if (elem.id === item.id) {
        return {
          ...elem,
          selected: !elem.selected,
        };
      }
      return elem;
    });
    setExcluded(newArr);
    addListData.exAmenities = newArr;
    let apiArray = [];
    newArr?.filter((elem) => {
      if (elem.selected) {
        apiArray.push(elem.id);
      }
    });
    addListObj.excluded_amenities = apiArray;
  };

  return (
    <Accordion isDone title={title} expanded={expanded} onToggle={onToggle}>
      <Spacer />
      <View style={styles.body}>
        <Text style={styles.tagline}>{I18n.t('amenti_tagline_1')}</Text>
        <Spacer />
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={excluded}
          renderItem={rendetExItem}
          keyExtractor={(item, index) => item + index.toString()}
        />
        <Spacer />
        <Text style={styles.tagline}>{I18n.t('amenti_tagline_2')}</Text>
        <Spacer />
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={included}
          renderItem={rendetInItem}
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
  tagline: {
    fontFamily: family.Montserrat_Regular,
    left: 2,
    fontSize: size.xtiny,
  },
});

export {AmentiesAcord};
