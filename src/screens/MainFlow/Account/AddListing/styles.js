import {StyleSheet, Platform} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../utilities';

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
    paddingBottom: WP('10'),
    marginHorizontal: WP('7'),
  },
  bottomScrollCotainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: HP('100'),
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: HP('5'),
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.9,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  clearFormText: {
    fontFamily: family.Montserrat_Regular,
    color: colors.red,
    fontSize: size.xsmall,
  },
});

export default styles;
