import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.bgLightColor,
  },
  logoContainer: {
    height: HP(21),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: WP(35),
    height: HP(16),
  },
  title: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.h3,
    textAlign: 'center',
  },
  inputContainer: {
    marginHorizontal: WP(6),
    marginTop: HP(2),
  },
  forgotContainer: {
    flexDirection: 'row',
    marginHorizontal: WP(6),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: HP(0),
  },
  smallText: {
    fontSize: size.xxtiny,
    fontFamily: family.Montserrat_Regular,
    textAlign: 'center',
  },
  loggedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxContainer: {
    padding: 0,
    margin: 0,
    marginLeft: 0,
    marginRight: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    marginHorizontal: WP(6),
    marginVertical: HP(2),
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
  checkBox: {
    padding: 0,
    margin: 0,
    marginLeft: 0,
    marginRight: 2,
  },
  userIcon: {
    width: WP('5'),
    height: HP('2.5'),
  },
});

export default styles;
