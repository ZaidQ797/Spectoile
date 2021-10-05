import {StyleSheet} from 'react-native';
import {colors, family, HP, WP, size} from '../../../../../utilities';

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
  statusText: {
    marginVertical: HP('3'),
    fontFamily: family.Montserrat_Medium,
    lineHeight: 25,
  },
  highlightedText: {
    backgroundColor: 'yellow',
    textTransform: 'capitalize',
  },
  orderdetailtext: {
    fontFamily: family.Montserrat_Bold,
  },
  priceContainer: {
    height: HP('10'),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginTop: WP('3'),
    backgroundColor: colors.white,
  },
  subTotalContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WP('3'),
  },
  totalContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WP('3'),
  },
  simpleText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
  },
  priceText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.small,
    color: colors.red,
  },
  divider: {
    width: '100%',
  },
  spacer: {
    marginVertical: HP('0.5'),
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
