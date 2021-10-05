import {StyleSheet} from 'react-native';
import {colors, HP, WP, family, size} from '../../../../utilities';

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
  },
  qoute: {
    paddingHorizontal: WP('15'),
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
  },
  flatListStyle: {
    justifyContent: 'center',
    paddingTop: WP('8'),
  },
});

export default styles;
