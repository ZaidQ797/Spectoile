import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.bgLightColor,
  },
  logoContainer: {
    height: HP(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: WP(35),
    height: HP(16),
  },
  title: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.h2,
    textAlign: 'center',
  },
  inputContainer: {
    marginHorizontal: WP(6),
    marginTop: HP(5),
  },
  forgotContainer: {
    flexDirection: 'row',
    marginHorizontal: WP(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: HP(2),
  },
  smallText: {
    fontSize: size.xxtiny,
    fontFamily: family.Montserrat_Regular,
    textAlign: 'center',
  },
  loggedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxContainer: {
    padding: 0,
    margin: 0,
    marginLeft: 0,
    marginRight: 2,
  },
  loginButton: {
    marginHorizontal: WP(6),
    marginVertical: HP(3),
    borderColor: colors.border,
    borderWidth: 1,
  },
  socialButton: {
    flex: 0.5,
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    paddingVertical: 0,
    padding: 0,
  },
  row: {
    flexDirection: 'row',
  },
  termsText: {
    textAlign: 'left',
    top: HP(0.5),
    fontSize: size.xtiny,
    width: '95%',
    fontFamily: family.Montserrat_Regular,
  },
  userIcon: {
    width: WP('5'),
    height: HP('2.5'),
  },
});

export default styles;
