import {StyleSheet} from 'react-native';
import {colors, family, WP, size} from '../../../../../utilities';

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
    paddingHorizontal: WP('10'),
    marginTop: WP('8'),
  },
  radioContainer: {
    backgroundColor: colors.white,
    marginTop: WP('5'),
    borderRadius: 5,
  },
  qoute: {
    fontFamily: family.Montserrat_Regular,
    textAlign: 'left',
    marginVertical: WP('8'),
    fontSize: size.tiny,
  },
  loginButton: {
    marginBottom: WP('10'),
  },
});

export default styles;
