import {StyleSheet} from 'react-native';
import {colors, family, HP, size, WP} from '../../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    // backgroundColor: colors.orange,
    height: '100%',
  },
  mapView: {
    width: WP('100%'),
    height: HP('29%'),
  },
  resultInfoContainer: {
    height: HP('8'),
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
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
  resultInfoContaier1: {
    flex: 0.45,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfoContaier2: {
    flex: 0.25,
    borderRightColor: colors.border,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfoContaier3: {
    flex: 0.25,
    borderRightColor: colors.border,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfoContaier4: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  simpleText: {
    fontSize: size.tiny,
    color: colors.black,
    marginHorizontal: WP('2'),
    fontFamily: family.Montserrat_Regular,
  },
  icon: {
    width: WP('6'),
    height: HP('2.5'),
  },
  listIcon: {
    width: WP('5'),
    height: HP('2.5'),
  },
  tabTitle: {
    fontSize: size.tiny,
    color: colors.black,
    marginHorizontal: WP('2'),
    fontFamily: family.Montserrat_Regular,
  },
  scrollView: {
    // flex: 1,
  },
});

export default styles;
