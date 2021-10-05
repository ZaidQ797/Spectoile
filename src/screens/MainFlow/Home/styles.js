import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../utilities';
import {hasNotch} from 'react-native-device-info';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bannerContainer: {
    width: WP('100%'),
    height: hasNotch() ? HP('40%') : HP('45%'),
    paddingTop: HP('3'),
  },
  welcomeText: {
    color: colors.white,
    fontFamily: family.Montserrat_Medium,
    fontWeight: '700',
    fontSize: size.normal,
  },
  qouteText: {
    color: colors.white,
    fontFamily: family.Montserrat_Medium,
    fontWeight: '900',
    fontSize: size.h6,
    marginTop: HP('0.5'),
  },
  animatedText: {
    color: colors.white,
    fontFamily: family.Montserrat_Medium,
    fontWeight: '300',
    fontSize: size.small,
    marginTop: HP('2'),
    textAlign: 'center',
    marginHorizontal: WP('5'),
  },
  searchContainer: {
    width: WP('80%'),
    height: HP('7'),
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: HP('3'),
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.p1,
    borderTopRightRadius: 5,
    borderBottomEndRadius: 5,
  },
  input: {
    fontFamily: family.Montserrat_Regular,
    paddingHorizontal: WP('2'),
  },
  searchIcon: {
    tintColor: colors.white,
  },
  topBannerCotainer: {
    paddingHorizontal: WP('10'),
  },
  scrollView: {
    flex: 1,
  },
  scrollViewCotainer: {
    paddingBottom: HP('3'),
  },
  redText: {
    color: colors.red,
    fontFamily: family.Montserrat_Medium,
    fontWeight: '800',
    fontSize: size.normal,
    marginTop: HP('10'),
    textAlign: 'center',
  },
  blackLable: {
    color: colors.black,
    fontFamily: family.Montserrat_Medium,
    fontWeight: '900',
    fontSize: size.h6,
    marginVertical: HP('2'),
    textAlign: 'center',
  },
  adView: {
    marginHorizontal: WP('5'),
    marginVertical: HP('1'),
  },
  spacer: {
    marginTop: HP('3'),
  },
  iconStyle: {
    width: WP('20'),
    height: HP('11.5'),
  },
  footerContainer: {
    backgroundColor: 'white',
    width: WP('20'),
    height: HP('40'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    backgroundColor: colors.white,
    marginHorizontal: WP('3'),
    height: HP('16'),
    top: -HP('9'),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.29,
    shadowRadius: 8.3,
    elevation: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: HP('7'),
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  bottomCotainer: {
    //  flex: 0.4,
    width: WP('90'),
    height: HP('33'),
    alignSelf: 'center',
    marginTop: -WP('1'),
  },
  bottomInnerContainer: {
    // marginHorizontal: WP('2'),
    zIndex: 10,
    backgroundColor: '#ffffff99',
  },
  subtitle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    color: colors.black,
    textAlign: 'left',
    fontWeight: '500',
    // marginTop: HP('2'),
    lineHeight: 20,
  },
  title: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.medium,
    color: colors.black,
    textAlign: 'left',
    marginTop: HP('2'),
    lineHeight: 20,
  },
  loginButton: {
    marginTop: hasNotch() ? HP('2') : HP('0'),
  },
});

export default styles;
