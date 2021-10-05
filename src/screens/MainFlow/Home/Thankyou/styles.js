import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../utilities';
import {hasNotch} from 'react-native-device-info';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.bgLightColor,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  merciCard: {
    height: hasNotch() ? WP('89') : WP('82'),
    backgroundColor: colors.white,
    marginHorizontal: WP('7'),
    borderRadius: 5,
  },
  merciBg: {
    width: WP('35'),
    height: HP('19'),
    alignSelf: 'center',
    bottom: WP('17'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  merciText: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.large,
    color: colors.white,
  },
  simpleText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    color: colors.black,
    textAlign: 'center',
    bottom: WP('15'),
  },
  rowCotainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WP('5'),
    paddingVertical: WP('2.8'),
  },
  divider: {
    marginHorizontal: WP('5'),
    // marginTop: WP('3'),
  },
  value: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xtiny,
    color: colors.p1,
    textAlign: 'center',
  },
  label: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
    textAlign: 'center',
  },
});

export default styles;
