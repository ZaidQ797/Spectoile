import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {colors, WP, HP, family, size} from '../../../../utilities';
import {hasNotch} from 'react-native-device-info';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  basketView: {
    width: WP('100%'),
    height: HP('10'),
    backgroundColor: colors.p2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basketText: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.large,
    color: colors.white,
  },
  body: {
    backgroundColor: colors.bgLightColor,
    flex: 1,
  },
  innerBody: {
    marginHorizontal: WP('7'),
  },
  spacer: {
    marginVertical: HP('0.5'),
  },
  flatlistContainer: {
    //  height: hasNotch() ? HP('35') : HP('43'),
    paddingTop: HP('2'),
  },
  flatlist: {
    marginTop: HP('2'),
  },
  input: {
    width: '100%',
  },
  boldText: {
    fontFamily: family.Montserrat_Bold,
    marginTop: WP('2'),
  },
  priceContainer: {
    height: HP('20'),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginTop: WP('3'),
    backgroundColor: colors.white,
  },
  scrollView: {
    paddingBottom: HP('14'),
  },
  subTotalContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WP('3'),
  },
  totalContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WP('3'),
  },
  simpleText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
  },
  priceText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.small,
    color: colors.red,
  },
  divider: {
    width: '100%',
  },
  cartListLoaderContainer: {
    justifyContent: 'center',
    height: HP('13'),
  },
});

export default styles;
