import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {colors, family, HP, WP, appIcons} from '../../utilities';

const CatCard = ({id, label, icon, selected, onPress, item}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.slug)}
      style={selected ? styles.selectedContainer : styles.container}>
      <Image
        resizeMode={'contain'}
        source={!item.icon ? appIcons.categoryPlacholder : {uri: item.icon}}
        style={selected ? styles.selectedIcon : styles.icon}
      />
      <Text
        numberOfLines={1}
        style={selected ? styles.selectedlabel : styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WP('28'),
    height: HP('12'),
    backgroundColor: colors.white,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: HP(2),
    marginHorizontal: WP('2'),
    paddingHorizontal: WP('3'),
    borderRadius: 5,
    borderColor: colors.border,
  },
  selectedContainer: {
    width: WP('28'),
    height: HP('12'),
    backgroundColor: colors.p2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: HP(2),
    marginHorizontal: WP('2'),
    paddingHorizontal: WP('3'),
    borderRadius: 5,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.94,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  icon: {
    width: WP('8'),
    height: HP('4'),
    tintColor: colors.black,
  },
  label: {
    marginTop: WP('2'),
    fontFamily: family.Montserrat_Regular,
    color: colors.black,
  },
  selectedlabel: {
    marginTop: WP('2'),
    fontFamily: family.Montserrat_Regular,
    color: colors.white,
  },
  selectedIcon: {
    width: WP('8'),
    height: HP('4'),
    tintColor: colors.white,
  },
});

export {CatCard};
