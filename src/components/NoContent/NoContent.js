import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {WP, HP, colors, family, appIcons, size} from '../../utilities';
import {hasNotch} from 'react-native-device-info';

export const NoContent = ({height, iconStyle, onRefreshPress}) => {
  return (
    <TouchableOpacity onPress={onRefreshPress} style={[styles.alert, {height}]}>
      <Image
        source={appIcons.refreshIcon}
        resizeMode={'contain'}
        style={[styles.icon, iconStyle]}
      />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>{'No Content Available'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  alert: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: hasNotch() ? HP('12') : HP('15'),
    width: WP('80%'),
    flex: 1,
    marginHorizontal: WP('3'),
  },
  title: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.xxsmall,
    color: colors.black,
  },
  icon: {
    width: WP('15'),
    height: HP('9'),
    tintColor: colors.lightGrey,
  },
  refreshIcon: {
    width: WP('5'),
    height: HP('5'),
    bottom: HP('1.7'),
    left: WP('2'),
    tintColor: colors.snackGreen,
  },
});
