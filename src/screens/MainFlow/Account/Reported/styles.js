import {StyleSheet} from 'react-native';
import {colors, HP, WP} from '../../../../utilities';

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
  scrollView: {
    paddingBottom: WP('20'),
    marginHorizontal: WP('8'),
  },
});

export default styles;
