import {StyleSheet} from 'react-native';
import {WP, HP, colors, isIPhoneX} from '../../utilities';
export const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: colors.white,
    height: HP('100%'),
    width: WP('80%'),
    borderBottomLeftRadius: WP('1'),
    borderTopLeftRadius: WP('1'),
  },
  spacer: {
    marginTop: HP('4'),
  },
});
