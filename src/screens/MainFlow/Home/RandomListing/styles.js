import {StyleSheet} from 'react-native';
import {colors, family, WP, size, HP} from '../../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    backgroundColor: colors.bgLightColor,
    paddingHorizontal: WP('8'),
    flex: 1,
  },
  profileQoute: {
    fontFamily: family.Montserrat_Regular,
    textAlign: 'center',
    paddingHorizontal: WP('5'),
    marginTop: WP('8'),
  },
  spacer: {
    marginTop: WP(4),
  },
  scrollView: {
    paddingBottom: WP('6'),
  },
  bannerContainer: {
    width: WP('100%'),
    height: HP('20%'),
    justifyContent: 'center',
  },
  welcomeText: {
    color: colors.white,
    fontFamily: family.Montserrat_Medium,
    fontWeight: '700',
    fontSize: size.normal,
  },
  searchContainer: {
    width: WP('80%'),
    height: HP('7'),
    backgroundColor: colors.white,
    borderRadius: 5,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff39',
  },
  qouteText: {
    color: colors.black,
    fontFamily: family.Montserrat_Bold,
    fontWeight: '800',
    fontSize: size.medium,
    marginTop: HP('1.5'),
    marginLeft: HP('2'),
    marginBottom: HP('0.1'),
  },
  qouteSubText: {
    color: colors.black,
    fontFamily: family.Montserrat_Bold,
    fontWeight: '300',
    fontSize: size.small,
    marginTop: HP('0.1'),
    marginLeft: HP('2'),
    marginBottom: HP('0.9'),
  },
  simpleText: {
    color: colors.black,
    fontFamily: family.Montserrat_Medium,
    fontWeight: '300',
    fontSize: size.normal,
  },
  flatListStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: WP('2'),
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: colors.white,
    fontFamily: family.Montserrat_Bold,
    fontWeight: '500',
    fontSize: size.medium,
  },
  whiteBoldText: {
    color: colors.white,
    fontFamily: family.Montserrat_Bold,
    fontWeight: '800',
    fontSize: size.medium,
  },
  loginButton: {
    marginTop: HP('0'),
    marginHorizontal: WP('5'),
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
