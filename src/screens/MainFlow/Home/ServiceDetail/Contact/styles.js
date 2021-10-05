import {StyleSheet} from 'react-native';
import {colors, WP, HP, family, size} from '../../../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mapView: {
    width: WP('100%'),
    height: HP('22%'),
  },
  marker: {
    width: WP('3'),
    height: WP('4'),
  },
  markerContainer: {
    width: WP('17'),
    height: WP('14'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerInnerContainer: {
    backgroundColor: colors.white,
    bottom: HP('1'),
    width: WP('8'),
    height: WP('8'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  body: {
    marginHorizontal: WP('8'),
  },
  title: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.small,
  },
  timeRowContainer: {
    flexDirection: 'row',
    marginVertical: HP('0.5'),
  },
  dayContainer: {
    flex: 0.5,
  },
  timeContainer: {
    flex: 0.5,
  },
  spacer: {
    marginTop: HP('2'),
  },
  simpleText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    textTransform: 'capitalize',
  },
  localTime: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxsmall,
    color: colors.p2,
  },
});

export default styles;
