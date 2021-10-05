import {StyleSheet} from 'react-native';
import {colors, family, WP, HP} from '../../../../utilities';
import {hasNotch} from 'react-native-device-info';

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
    paddingHorizontal: WP('5'),
    marginTop: WP('8'),
  },
  spacer: {
    marginTop: WP(4),
  },
  scrollView: {
    paddingBottom: WP('6'),
  },
  picBG: {
    // width: hasNotch() ? WP('26.7') : WP('25'),
    // height: HP('14'),
    width: 115,
    height: 115,
    borderRadius: 115 / 2,
    alignSelf: 'center',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.p2,
  },
  userImage: {
    width: 109,
    height: 109,
    borderRadius: 109 / 2,
  },
});

export default styles;
