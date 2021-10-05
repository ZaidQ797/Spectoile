import React, {useEffect, useState, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  colors,
  WP,
  appIcons,
  HP,
  family,
  size,
  appImages,
  getPriceImage,
  getRatingImage,
} from '../../utilities';
import {Divider} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';

const ServiceInfoCard = ({item, onActionWishlist}) => {
  const [ratingImage, setRatingImage] = useState(appImages.start_0);
  const [priceImage, setPriceImage] = useState(appImages.price_0);

  useEffect(() => {
    try {
      setRatingImage(getRatingImage(item?.avg_rating));
      setPriceImage(getPriceImage(item?.avg_price_tag[0]));
    } catch (err) {}
  }, [item]);
  return (
    <View
      style={[
        styles.main,
        // eslint-disable-next-line react-native/no-inline-styles
        {marginTop: item?.gallery[0] === null ? HP('8') : 0},
      ]}>
      <View style={styles.topCotainer}>
        <Text numberOfLines={2} style={styles.topTitle}>
          {item?.post_title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            onActionWishlist(item?.ID, item?.in_wish_list ? 'remove' : 'add')
          }
          style={styles.whiteView}>
          <Image
            resizeMode={'contain'}
            style={styles.heartIcon}
            source={
              item?.in_wish_list ? appIcons.heartFilled : appIcons.heartIcon
            }
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={item?.associated_cats?.filter((elem) => elem.icon !== null)}
          numColumns={2}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={({item, index}) => (
            <FeatureRow
              leftIcon={item.icon}
              leftLable={item.name}
              index={index}
              rightIcon={appIcons.usersIcon}
              rightLable={'Convient aux familles'}
            />
          )}
        />
      </View>
      <Divider style={styles.divider} />
      {/* <FeatureRow
        leftIcon={appIcons.cultureCategory}
        leftLable={'Culture'}
        rightIcon={appIcons.rainIcon}
        rightLable={'En cas de mauvais temps'}
      /> */}
      <Divider />
      <View style={styles.bottomView}>
        <View style={styles.ratingContaier}>
          <Image
            resizeMode={'contain'}
            source={ratingImage}
            style={styles.ratingIcon}
          />
          <Text numberOfLines={1} style={styles.smallText}>
            Evulation
          </Text>
        </View>
        <View style={styles.priceContaier}>
          <Image
            resizeMode={'contain'}
            source={priceImage}
            style={styles.priceIcon}
          />
          <Text
            numberOfLines={1}
            style={[
              styles.smallText,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                textAlign: 'right',
              },
            ]}>
            Budget
          </Text>
        </View>
      </View>
    </View>
  );
};

const FeatureRow = ({leftIcon, leftLable, rightLable, rightIcon, index}) => (
  <View key={index} style={[styles.featureContainer]}>
    <View style={styles.leftContainer}>
      <Image
        resizeMode={'contain'}
        source={
          leftIcon === null ? appIcons.categoryPlacholder : {uri: leftIcon}
        }
        style={styles.icon}
      />
      <Text numberOfLines={2} style={styles.leftLable}>
        {leftLable}
      </Text>
    </View>
    {/* <View style={styles.rightContainer}>
      <Image resizeMode={'contain'} source={rightIcon} style={styles.icon} />
      <Text numberOfLines={1} style={styles.rightLable}>
        {rightLable}
      </Text>
    </View> */}
  </View>
);

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    backgroundColor: colors.white,
    marginHorizontal: WP('7'),
    borderColor: colors.border,
    borderRadius: 5,
    bottom:
      Platform.OS === 'android'
        ? WP('15')
        : DeviceInfo.hasNotch()
        ? WP('10')
        : WP('9'),
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
        elevation: 7,
      },
    }),
  },
  topCotainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: WP('6'),
    marginVertical: WP('3'),
  },
  whiteView: {
    borderRadius: 5,
    backgroundColor: colors.white,
    width: WP('10'),
    height: HP('5'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: WP('2'),
    borderWidth: 1,
    borderColor: colors.border,
  },
  heartIcon: {
    width: WP('7'),
    height: HP('3'),
    tintColor: colors.p1,
  },
  topTitle: {
    fontFamily: family.Montserrat_Bold,
    textAlign: 'left',
    alignSelf: 'center',
    fontSize: size.medium,
    width: WP('50'),
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: WP('6'),
    marginVertical: WP('3'),
    //flex: 1,
    alignSelf: 'flex-start',
  },
  leftContainer: {
    //   flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  rightContainer: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftLable: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    textAlign: 'left',
    width: WP('29'),
    left: WP('1'),
  },
  rightLable: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    textAlign: 'left',
    width: WP('40'),
    left: WP('2'),
  },
  icon: {
    width: WP('4'),
    height: HP('3'),
    tintColor: colors.black,
    color: colors.black,
  },
  priceIcon: {
    width: WP('12'),
    height: HP('2'),
    tintColor: colors.p1,
  },
  divider: {
    // marginHorizontal: WP('6'),
  },
  bottomView: {
    height: HP('8'),
    backgroundColor: colors.bgLightColor,
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: WP('5'),
    paddingVertical: WP('2'),
    alignItems: 'center',
  },
  smallText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxxtiny,
    textAlign: 'left',
    width: WP('40'),
    marginTop: WP('2'),
  },
  ratingContaier: {
    flex: 0.5,
    alignItems: 'flex-start',
  },
  priceContaier: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  ratingIcon: {
    width: WP('15'),
    height: WP('4'),
  },
});

export {ServiceInfoCard};
