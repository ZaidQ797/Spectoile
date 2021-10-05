import React, {useEffect, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors, WP, appIcons, HP, family, size} from '../../utilities';
import {Divider} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import I18n from '../../translation';

const ContactCard = ({contactInfo}) => {
  useEffect(() => {
    // console.log('Contact info', contactInfo);
  }, [contactInfo]);

  const onMakePhoneCall = (phone) => {
    console.log('Phone', phone.split(' ').join(''));
    Linking.openURL(`tel:${phone.split(' ').join('')}`).catch((err) => {
      console.log(err);
      Alert.alert('Error', err);
    });
  };

  const onOpenEmailApp = (email) => {
    console.log('email', email?.split(' ').join(''));
    Linking.openURL(`mailto:${email?.split(' ').join('')}`).catch((err) => {
      console.log(err);
      Alert.alert('Error', err);
    });
  };

  const onOpenMap = (address) => {
    console.log('email', address.split(' ').join(''));
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${address}`,
    ).catch((err) => {
      console.log(err);
      Alert.alert('Error', err);
    });
  };

  const onOpenWebiste = (link) => {
    if (link.includes('http://') || link.includes('https://')) {
      console.log(link);
      Linking.openURL(link)
        .then(() => {})
        .catch((err) => {
          console.log(err);
          Alert.alert('Error', err);
        });
    } else {
      Linking.openURL('http://' + link)
        .then(() => {})
        .catch((err) => {
          console.log(err);
          Alert.alert('Error', err);
        });
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.topCotainer}>
        <Text style={styles.topTitle}>{I18n.t('contactdot')}</Text>
      </View>
      {contactInfo?.address !== '' && (
        <Fragment>
          <FeatureRow
            rightIcon={appIcons.locationPin}
            rightLable={contactInfo?.address}
            onPress={onOpenMap}
          />
          <Divider style={styles.divider} />
        </Fragment>
      )}
      {contactInfo?.email !== '' && (
        <Fragment>
          <FeatureRow
            rightIcon={appIcons.mailIcon}
            rightLable={contactInfo?.email}
            onPress={onOpenEmailApp}
          />
          <Divider />
        </Fragment>
      )}
      {contactInfo?.phone !== '' && (
        <Fragment>
          <FeatureRow
            rightIcon={appIcons.phoneIcon}
            rightLable={contactInfo?.phone?.trim()}
            onPress={onMakePhoneCall}
          />
          <Divider />
        </Fragment>
      )}
      {contactInfo?.website !== '' && (
        <Fragment>
          <FeatureRow
            rightIcon={appIcons.globeIcon}
            rightLable={contactInfo?.website}
            onPress={onOpenWebiste}
          />
          <Divider />
        </Fragment>
      )}
      {contactInfo?.website === '' &&
      contactInfo?.email === '' &&
      contactInfo?.address === '' &&
      contactInfo?.phone !== '' ? (
        <Fragment>
          <Text
            style={[
              styles.leftLable,
              {
                marginHorizontal: WP('5'),
                marginVertical: HP('2'),
              },
            ]}>
            No Address Information Available
          </Text>
        </Fragment>
      ) : null}
    </View>
  );
};

const FeatureRow = ({rightLable, rightIcon, onPress}) => (
  <TouchableOpacity
    onPress={() => onPress(rightLable)}
    style={styles.featureContainer}>
    <View style={styles.leftContainer}>
      <Image resizeMode={'contain'} source={rightIcon} style={styles.icon} />
      <Text numberOfLines={1} style={styles.leftLable}>
        {rightLable}
      </Text>
    </View>
  </TouchableOpacity>
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
        ? WP('8')
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
    marginTop: WP('3'),
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
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: size.medium,
  },
  featureContainer: {
    flexDirection: 'row',
    marginHorizontal: WP('6'),
    marginVertical: WP('3'),
  },
  leftContainer: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftLable: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xtiny,
    textAlign: 'left',
    width: WP('65'),
    left: WP('2'),
  },
  icon: {
    width: WP('4'),
    height: HP('3'),
    tintColor: colors.lightGrey,
  },
  priceIcon: {
    width: WP('12'),
    height: HP('2'),
    tintColor: colors.p1,
    //color: colors.black,
  },
  divider: {
    marginHorizontal: WP('6'),
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

export {ContactCard};
