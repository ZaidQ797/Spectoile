import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors, HP, WP, appIcons, family, size} from '../../utilities';
import {Icon} from 'react-native-elements';

const MenuCard = ({
  index,
  title,
  icon,
  onPress,
  isBorder,
  item,
  backgroundColor = colors.white,
  labelColor = colors.black,
}) => {
  return (
    <TouchableOpacity
      key={index}
      onPress={() => onPress(item)}
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          borderWidth: isBorder ? 1 : 0,
          borderColor: isBorder ? colors.border : colors.white,
          backgroundColor,
        },
      ]}>
      <View style={styles.leftContainer}>
        <Image
          source={icon}
          style={[styles.menuIcon, {tintColor: labelColor}]}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, {color: labelColor}]}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity>
          <Icon
            type={'entypo'}
            name={'chevron-thin-right'}
            size={16}
            color={labelColor}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginHorizontal: WP('5'),
    marginVertical: HP('1'),
    height: HP('7'),
    flexDirection: 'row',
  },
  leftContainer: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  body: {flex: 0.6, justifyContent: 'center', alignItems: 'flex-start'},
  rightContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {width: WP('12'), height: HP('7')},
  menuIcon: {width: WP('8'), height: HP('2.5'), tintColor: colors.black},
  title: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
  },
});

export {MenuCard};
