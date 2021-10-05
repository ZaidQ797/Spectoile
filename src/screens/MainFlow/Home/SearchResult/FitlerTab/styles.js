import {StyleSheet} from 'react-native';
import {WP, colors, HP} from '../../../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.bgLightColor,
  },
  body: {
    marginHorizontal: WP('5'),
  },
  spacer: {
    marginVertical: WP('2'),
  },
  flatListContainer: {
    alignItems: 'center',
    paddingBottom: HP('5'),
  },
});

export default styles;
