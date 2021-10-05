import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../../utilities';
import {hasNotch} from 'react-native-device-info';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.bgLightColor,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  label: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
    textAlign: 'center',
  },
});

export default styles;
