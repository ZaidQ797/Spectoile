import {StyleSheet} from 'react-native';
import {colors, family, HP, WP} from '../../../../../utilities';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors.bgLightColor,
  },
  text: {
    fontFamily: family.Montserrat_Regular,
    color: colors.black,
  },
  cancelText: {
    fontFamily: family.Montserrat_Regular,
    color: colors.red,
    marginTop: HP('1'),
  },
  spacer: {
    marginVertical: WP('2'),
  },
  flatListContainer: {
    alignItems: 'center',
    marginTop: WP('5'),
    paddingBottom: WP('5'),
  },
});

export default styles;
