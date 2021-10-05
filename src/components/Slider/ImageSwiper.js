import React, {useEffect} from 'react';
import {View, StyleSheet, Platform, ActivityIndicator} from 'react-native';
import {hasNotch} from 'react-native-device-info';
import {Image} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import {colors, HP, WP} from '../../utilities';

const ImageSwiper = ({data}) => {
  useEffect(() => {}, [data]);

  return (
    <View style={styles.container}>
      <Swiper
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}>
        {data?.map((item, index) => {
          return (
            // <Image
            //   key={index}
            //   // resizeMode={''}
            //   source={{uri: item}}
            //   style={styles.icon}
            // />
            <Image
              source={{uri: item}}
              style={styles.icon}
              onError={({nativeEvent}) => {
                console.log(nativeEvent);
              }}
              PlaceholderContent={
                <ActivityIndicator animating color={colors.black} />
              }
            />
          );
        })}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HP('30'),
    width: WP('100%'),
  },
  wrapper: {
    height: HP('50'),
    //  marginHorizontal: WP('7'),
  },
  icon: {
    width: WP('100%'),
    height: HP('30'),
  },
  dot: {
    backgroundColor: colors.white,
    width: hasNotch() ? WP('4.3') : Platform.isPad ? WP('3.3') : WP('4.3'),
    height: hasNotch() ? HP('2') : HP('2.5'),
    borderRadius: 10,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: Platform.OS !== 'android' ? WP('10') : WP('14'),
    borderWidth: 3,
    borderColor: colors.border,
    top: WP('4'),
  },
  activeDot: {
    backgroundColor: colors.white,
    width: hasNotch() ? WP('4.3') : Platform.isPad ? WP('3.3') : WP('4.3'),
    height: hasNotch() ? HP('2') : HP('2.5'),
    borderRadius: 10,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: Platform.OS !== 'android' ? WP('10') : WP('14'),
    borderWidth: 3,
    borderColor: colors.p1,
    top: WP('4'),
  },
});

export {ImageSwiper};
