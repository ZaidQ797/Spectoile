/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, View, Platform, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {WP, HP, colors, appIcons, appSvgs} from '../../utilities';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/routers';
import {Icon, Badge} from 'react-native-elements';
import {useSelector} from 'react-redux';

const IconHeader = ({
  onLeftPress,
  onHeartPress,
  onSearchPress,
  showSearch = true,
  showHeart = true,
}) => {
  const navigation = useNavigation();
  const {HeartSvg, SearchSvg} = appSvgs;

  const {wishlistCount} = useSelector((state) => state.wishlist);
  const {isLoggedIn} = useSelector((state) => state.login);

  useEffect(() => {}, [wishlistCount]);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onLeftPress}>
          <Image
            source={appIcons.menuIcon}
            style={styles.menuIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            //navigation.navigate('Home');
            if (isLoggedIn) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'App'}],
                }),
              );
            }
          }}>
          <Image
            source={appIcons.appLogo}
            style={styles.logo}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        {showHeart && (
          <TouchableOpacity
            style={
              Platform.OS === 'android'
                ? {
                    overflow: 'hidden',
                    height: HP('5'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {}
            }
            onPress={onHeartPress}>
            {/* <Image
              source={appIcons.heartIcon}
              style={styles.icon}
              resizeMode={'contain'}
            /> */}

            {wishlistCount && wishlistCount !== 0 ? (
              <Badge
                status="success"
                value={wishlistCount}
                containerStyle={styles.badgeContainer}
              />
            ) : null}

            <Icon
              type={'feather'}
              style={styles.iconStyle}
              name={'heart'}
              size={WP('6')}
              containerStyle={{
                right: Platform.OS === 'android' ? 0 : WP('2'),
                marginRight: Platform.OS === 'android' ? WP('2') : 0,
                overflow: 'hidden',
              }}
            />
          </TouchableOpacity>
        )}
        {showSearch && (
          <TouchableOpacity onPress={onSearchPress}>
            <Icon type={'feather'} name={'search'} size={WP('6')} />
            {/* <Image
              source={appIcons.searchIcon}
              style={[styles.icon, {marginLeft: WP(3)}]}
              resizeMode={'contain'}
            /> */}
            {/* <SearchSvg width={120} height={40} /> */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WP('100%'),
    height: HP('9'),
    flexDirection: 'row',
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  leftContainer: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  body: {flex: 0.6, justifyContent: 'center', alignItems: 'center'},
  rightContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {width: WP('12'), height: HP('7')},
  icon: {width: WP('6'), height: HP('2.5')},
  menuIcon: {width: WP('6'), height: HP('2')},
  iconStyle: {marginRight: 6},
  badgeContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 0 : -8,
    right: Platform.OS === 'android' ? 3 : 4,
    zIndex: 9,
    width: WP('5'),
    height: HP('4'),
  },
});

export {IconHeader};
