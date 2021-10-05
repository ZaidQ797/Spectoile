import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {IconButton} from '../../../components';
import {HP, colors, WP, family, size, appIcons} from '../../../utilities';
import I18n from '../../../translation';

const AddPaymentCard = ({title, onPress, btnType, showButton = true}) => {
  let btnTitle =
    btnType === 'addpayment'
      ? I18n.t('add_payment_method')
      : btnType === 'download'
      ? I18n.t('goto_store')
      : '';
  let btnIcon =
    btnType === 'addpayment'
      ? appIcons.plusIcon
      : btnType === 'download'
      ? appIcons.downloadIcon
      : appIcons.loginIcon;

  return (
    <View style={styles.priceContainer}>
      <Text
        style={[
          styles.profileQoute,
          {
            marginTop: showButton ? WP('8') : WP('5'),
          },
        ]}>
        {title}
      </Text>
      {showButton && (
        <IconButton
          title={btnTitle}
          backgroundColor={colors.p1}
          icon={btnIcon}
          iconColor={colors.white}
          style={styles.loginButton}
          titleColor={colors.white}
          onSubmit={onPress}
        />
      )}
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    // height: HP('14'),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginTop: WP('3'),
    backgroundColor: colors.white,
  },
  scrollView: {
    paddingBottom: HP('14'),
  },
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WP('3'),
    height: HP('7'),
  },
  primaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP('3'),
    height: HP('7'),
    backgroundColor: colors.p2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  simpleText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
  },
  whiteText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.xsmall,
    color: colors.white,
  },
  priceText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.small,
    color: colors.red,
  },
  divider: {
    width: '100%',
  },
  text: {
    marginLeft: WP('3'),
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xtiny,
    color: colors.black,
    marginTop: WP('1.5'),
  },
  editIcon: {
    tintColor: colors.p1,
    right: WP('3'),
  },
  spacer: {
    marginVertical: WP('2'),
  },
  profileQoute: {
    fontFamily: family.Montserrat_Regular,
    textAlign: 'center',
    paddingHorizontal: WP('10'),
    marginTop: WP('8'),
  },
  loginButton: {
    marginTop: WP('10'),
    marginHorizontal: WP('5'),
  },
});

export {AddPaymentCard};
