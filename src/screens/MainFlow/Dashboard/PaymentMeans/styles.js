import {StyleSheet} from 'react-native';
import {colors, family, WP} from '../../../../utilities';

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
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    marginVertical: WP('5'),
  },
});

export default styles;
