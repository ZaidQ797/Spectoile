import {StyleSheet} from 'react-native';
import {colors, HP, WP} from '../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  spacer: {
    marginTop: HP('4'),
  },
  body: {
    flex: 1,
    backgroundColor: colors.bgLightColor,
  },
  scrollView: {
    paddingBottom: WP('20'),
  },
});

export default styles;
