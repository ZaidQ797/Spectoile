import {StyleSheet, Platform} from 'react-native';
import {color} from 'react-native-reanimated';
import {colors, family, HP, size, WP} from '../../../../utilities';
import {hasNotch} from 'react-native-device-info';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    //backgroundColor: colors.orange,
  },
  readMoreBtnText: {
    color: colors.darkGrey,
    marginTop: 5,
    fontFamily: family.Montserrat_Bold,
    fontSize: size.small,
    textDecorationLine: 'underline',
  },
  scrollViewCotainer: {
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: colors.bgLightColor,
    //  backgroundColor: colors.red,
  },
  body: {
    marginHorizontal: WP('6.5'),
    backgroundColor: colors.bgLightColor,
    bottom: hasNotch() ? HP('2.9') : HP('2'),
  },
  cardText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
  },
  summrizeText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.medium,
    marginTop: WP('4'),
    marginBottom: WP('3'),
    fontWeight: '700',
  },
  featureContaier: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: WP('2'),
  },
  checkIcon: {
    width: WP('5'),
    height: HP('2'),
  },
  featureText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    textAlign: 'left',
    left: WP('1'),
    width: WP('80'),
  },
  ratingContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    height: hasNotch() && Platform.OS !== 'android' ? HP('39') : HP('46'),
    borderRadius: 5,
    marginTop: HP('3'),
  },
  ratingNo: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.h1,
    textAlign: 'center',
    marginTop: WP('5'),
    color: colors.p1,
  },
  simpleText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    textAlign: 'center',
  },
  loginText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    textAlign: 'left',
    marginTop: HP('1.2'),
  },
  whiteContainer: {
    width: WP('19'),
    height: HP('4.5'),
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: WP('2'),
    borderColor: colors.border,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: WP('4'),
    marginBottom: WP('2'),
    marginHorizontal: WP('5'),
  },
  simpleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: WP('1'),
  },
  blacklabel: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.normal,
    textAlign: 'left',
    fontWeight: '500',
    marginTop: WP('5'),
  },
  captachaImage: {
    width: WP('26'),
    height: HP('10'),
  },
  contactButton: {
    marginTop: HP('2'),
  },
  sendButton: {
    marginTop: HP('3'),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.xsmall,
    textAlign: 'center',
  },
  logout: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.xxsmall,
    textAlign: 'center',
    color: colors.p1,
  },
  noReviewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
});

export default styles;
