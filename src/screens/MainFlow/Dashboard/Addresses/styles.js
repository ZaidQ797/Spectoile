import {StyleSheet} from 'react-native';
import {colors, family, WP, HP} from '../../../../utilities';

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
    paddingHorizontal: WP('3'),
    marginTop: WP('4'),
  },
  spacer: {
    marginTop: WP('5'),
  },
  buttonContainer: {
    height: HP('7'),
    borderRadius: WP('13'),
  },
  btn: {
    borderRadius: WP('13'),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: colors.p1,
  },
  btnUnslected: {
    borderRadius: WP('13'),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  selectedText: {
    color: colors.white,
    fontFamily: family.Montserrat_Regular,
  },
  unselectedText: {
    color: colors.black,
    fontFamily: family.Montserrat_Regular,
  },
  centerView: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
