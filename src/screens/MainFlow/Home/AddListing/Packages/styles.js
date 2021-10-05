import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  redText: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.tiny,
    color: colors.red,
    textAlign: 'center',
    marginTop: HP('4'),
  },
  blackText: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.medium,
    textAlign: 'center',
    marginTop: HP('1'),
  },
  simpleBlack: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.medium,
    textAlign: 'left',
    marginTop: HP('1'),
  },
  subtitle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    color: colors.black,
    textAlign: 'left',
    marginTop: HP('2'),
    lineHeight: 20,
  },
  body: {
    backgroundColor: colors.bgLightColor,
    flex: 1,
  },
  sliderCotainer: {
    flex: 1,
    marginHorizontal: WP('7'),
  },
  bottomCotainer: {
    flex: 0.4,
    width: WP('90'),
    height: HP('30'),
    alignSelf: 'center',
    marginTop: WP('20'),
  },
  row: {
    flexDirection: 'row',
    marginVertical: WP('2'),
  },
  text: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    color: colors.black,
    textAlign: 'left',
    marginLeft: WP('3'),
  },
  arrow: {
    width: WP('3'),
    height: HP('2'),
    alignSelf: 'center',
    tintColor: colors.black,
    color: colors.black,
  },
  spacer: {
    marginVertical: WP('2'),
  },
  scrollView: {
    paddingBottom: WP('15'),
    backgroundColor: colors.bgLightColor,
  },
});

export default styles;
