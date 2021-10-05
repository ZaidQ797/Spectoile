import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors, family, HP, WP, admob_ios_app_id} from '../../utilities';
import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';

const AdCard = ({ad, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <BannerAd unitId={admob_ios_app_id} size={BannerAdSize.BANNER} />
      {/* <Image resizeMode={'contain'} source={ad} style={styles.icon} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WP('100%'),
    height: HP('6'),
    backgroundColor: colors.white,
    borderRadius: 0,
    //borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'center',
    marginTop: HP('3'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: WP('80%'),
    height: HP(8.8),
    borderRadius: 0,
  },
});

export {AdCard};
