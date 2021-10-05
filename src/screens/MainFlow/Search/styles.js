import {StyleSheet} from 'react-native';
import {colors, family, WP, size, HP} from '../../../utilities';

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
    height: HP('15%'),
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
  },
  qouteText: {
    color: colors.black,
    fontFamily: family.Montserrat_Medium,
    fontWeight: '300',
    fontSize: size.small,
    marginTop: HP('1.5'),
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
});

export default styles;
