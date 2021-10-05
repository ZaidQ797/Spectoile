import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../../utilities';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: WP('5'),
    paddingVertical: HP('4'),
    backgroundColor: colors.bgLightColor,
  },
  text: {
    fontFamily: family.Montserrat_Regular,
    color: colors.black,
    marginTop: HP('3'),
  },
  cancelText: {
    fontFamily: family.Montserrat_Regular,
    color: colors.red,
    marginTop: HP('1'),
  },
  saveQouteStyle: {
    fontFamily: family.Montserrat_Regular,
    color: colors.black,
    fontSize: size.tiny,
    marginTop: HP('1.5'),
  },
});

export default styles;
