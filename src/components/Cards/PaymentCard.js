import React, {useState, Fragment, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {HP, colors, WP, family, size, appIcons} from '../../utilities';
import I18n from '../../translation';

const PaymentCard = ({payments, onRadioPress}) => {
  return (
    <View style={styles.priceContainer}>
      {payments.map((item, index) => (
        <RadioItem
          type={item.type}
          label={item.label}
          index={index}
          selected={item.selected}
          onPress={onRadioPress}
          id={item.id}
        />
      ))}
    </View>
  );
};

export const RadioItem = ({
  label,
  type,
  index,
  selected,
  onPress,
  id,
  showDivider = true,
}) => (
  <Fragment>
    <View key={index} style={styles.radioContainer}>
      <TouchableOpacity onPress={() => onPress(id)}>
        <Image
          style={styles.radio}
          source={selected ? appIcons.radioChecked : appIcons.radioUnchecked}
        />
      </TouchableOpacity>
      <RadioLabel type={type} label={label} />
    </View>
    {showDivider && <Divider />}
  </Fragment>
);

const RadioLabel = ({type, label}) => {
  if (type === 'bacs') {
    return (
      <View>
        <Text style={styles.radioLabel}>{label}</Text>
      </View>
    );
  } else if (type === 'paypal') {
    return (
      <View style={styles.paypalContainer}>
        <View style={styles.paypalRow}>
          <Image
            style={styles.paypalIcon}
            resizeMode={'contain'}
            source={appIcons.paypal_image}
          />
          <Text style={styles.paypalText}>Paypal</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://www.paypal.com/ch/webapps/mpp/home',
              ).catch((err) => {
                // eslint-disable-next-line no-alert
                alert(err);
              })
            }>
            <Text style={styles.whatisPaypal}>{I18n.t('what_is_paypal')}</Text>
          </TouchableOpacity>
        </View>
        <Text numberOfLines={3} style={styles.paypalQoute}>
          {I18n.t('paypal_qoute')}
        </Text>
      </View>
    );
  } else if (type === 'stripe') {
    return (
      <View>
        <Text style={styles.radioLabel}>{label}</Text>
        <View style={styles.stripeContainer}>
          <Image
            style={styles.paypalIcon}
            resizeMode={'contain'}
            source={appIcons.visaIcon}
          />
          <Image
            style={[styles.paypalIcon, {marginLeft: WP('2')}]}
            resizeMode={'contain'}
            source={appIcons.americanExpIcon}
          />
          <Image
            style={[styles.paypalIcon, {marginLeft: WP('2')}]}
            resizeMode={'contain'}
            source={appIcons.masterCrdIcon}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  priceContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginTop: WP('3'),
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
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
  radioContainer: {
    flexDirection: 'row',
    paddingHorizontal: WP('3'),
    padding: WP('3'),
  },
  radio: {
    width: WP('4.5'),
    height: WP('4.5'),
    alignSelf: 'center',
  },
  radioLabel: {
    marginLeft: WP('2.5'),
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
  },
  paypalContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    // bottom: 5,
  },
  paypalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '96%',
    alignItems: 'center',
  },
  paypalIcon: {
    width: WP('10'),
    height: HP('4'),
    right: WP('1'),
  },
  paypalText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
    textAlign: 'left',
    right: WP('6'),
  },
  whatisPaypal: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxtiny,
    color: colors.red,
    textAlign: 'right',
  },
  paypalQoute: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xtiny,
    marginTop: WP('3'),
    marginLeft: WP('2.5'),
    width: 250,
  },
  stripeContainer: {
    flexDirection: 'row',
    marginHorizontal: WP('4'),
    marginTop: WP('2'),
  },
});

export {PaymentCard};
