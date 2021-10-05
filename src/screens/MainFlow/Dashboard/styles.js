import {StyleSheet} from 'react-native';
import {colors, HP} from '../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  spacer: {
    marginTop: HP('4'),
  },
  body: {
    backgroundColor: colors.bgLightColor,
    flex: 1,
  },
});

export default styles;
