import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../utilities';
import {hasNotch} from 'react-native-device-info';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 8.9) / 4);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.red,
  },
  merciCard: {
    width: WP('65'),
    height: hasNotch() ? WP('114') : WP('104'),
    backgroundColor: colors.white,
    paddingHorizontal: WP('5'),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1,
      },
    }),
    zIndex: 9,
    position: 'absolute',
  },
  merciBg: {
    width: WP('35'),
    height: HP('19'),
    alignSelf: 'center',
    bottom: WP('17'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  merciText: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.large,
    color: colors.white,
    width: 100,
    textAlign: 'center',
  },
  simpleText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    color: colors.black,
    textAlign: 'center',
  },
  rowCotainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: WP('5'),
    paddingVertical: WP('2.8'),
  },
  divider: {
    //marginHorizontal: WP('5'),
    // marginTop: WP('3'),
  },
  value: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xtiny,
    color: colors.black,
    textAlign: 'center',
  },
  label: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
    textAlign: 'center',
  },
  greenView: {
    backgroundColor: colors.lightGreen,
    width: WP('30'),
    height: HP('3'),
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    bottom: WP('15'),
    paddingHorizontal: WP('5'),
  },
  statusText: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.xtiny,
    alignSelf: 'center',
    color: colors.white,
  },
  carouselContainer: {
    // marginTop: 50,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'dodgerblue',
  },
  itemLabel: {
    color: 'white',
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redText: {
    color: 'red',
    fontWeight: '500',
    fontFamily: family.Montserrat_Regular,
  },
});

export default styles;
