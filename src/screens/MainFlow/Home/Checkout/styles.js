import {StyleSheet} from 'react-native';
import {colors, WP, family, size, HP} from '../../../../utilities';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  basketView: {
    width: WP('100%'),
    height: HP('10'),
    backgroundColor: colors.p2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basketText: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.large,
    color: colors.white,
  },
  bodyContainer: {
    backgroundColor: colors.bgLightColor,
    flex: 1,
  },
  body: {
    marginHorizontal: WP('8'),
  },
  yourOrderText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.large,
    color: colors.black,
    //  marginTop: WP('1'),
  },
  scrollView: {
    paddingBottom: WP('10'),
  },
  paymentQoute: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.tiny,
    color: colors.black,
    marginTop: WP('5'),
    left: 2,
  },
  addBilling: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.xsmall,
    color: colors.snackRed,
    marginVertical: WP('5'),
  },
  saveCardCheckContainer: {
    flexDirection: 'row',
  },
  checkBoxContainer: {
    borderWidth: 0,
    padding: 0,
    margin: 0,
    alignSelf: 'center',
  },
  saveText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
    width: WP('70'),
  },
  payButton: {
    width: '100%',
    height: HP('5.5'),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.border,
    flexDirection: 'row',
  },
  payBtnTexT: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.small,
    color: colors.black,
    left: WP('1'),
  },
  applePayIcon: {
    width: WP('10'),
    height: HP('3.5'),
  },
});

export default styles;
