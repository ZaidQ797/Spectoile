import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {WP, colors} from '../../utilities';

const DropDown = ({
  label,
  zIndex,
  data = [
    {
      label: 'Title',
      value: 'date',
    },
    {
      label: 'Title 2',
      value: 'date',
    },
  ],
  withMargin = true,
  getVal = () => {},
  searchable = false,
  withDefault = false,
}) => {
  const [value, setValue] = useState('');

  return (
    <DropDownPicker
      zIndex={zIndex}
      placeholder={label}
      items={data}
      searchable={searchable}
      searchablePlaceholder={'Chercher'}
      searchablePlaceholderTextColor={colors.black}
      defaultValue={withDefault ? data[0].value : value}
      containerStyle={[
        styles.containerStyle,
        // eslint-disable-next-line react-native/no-inline-styles
        {marginHorizontal: !withMargin ? 0 : WP('5')},
      ]}
      style={styles.dropdown}
      itemStyle={styles.itemStyle}
      dropDownStyle={styles.dropDownStyle}
      onChangeItem={(item) => getVal(item)}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  itemStyle: {
    justifyContent: 'flex-start',
  },
  dropdown: {
    backgroundColor: colors.white,
    position: 'absolute', // It was absolute
    zIndex: 10,
  },
  dropDownStyle: {
    backgroundColor: colors.white,
    position: 'absolute', // It was absolute
  },
  containerStyle: {
    height: WP('11'),
    marginHorizontal: WP('5'),
  },
});

export {DropDown};
