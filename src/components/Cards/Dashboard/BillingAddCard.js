import React, {Fragment, useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {HP, colors, WP, family, size, appIcons} from '../../../utilities';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const BillingAddCard = ({
  title,
  type = 'Billing',
  withEdit = true,
  data = {
    address_1: 'abcd',
    address_2: '',
    city: 'Lahore',
    company: '',
    country: 'PK',
    email: 'dev.web.5@gmail.com',
    first_name: 'Sven',
    last_name: 'Truffer',
    phone: '03369999999',
    postcode: '54000',
    state: 'PB',
  },
  isCheckout = false,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const navigation = useNavigation();

  const {addresses} = useSelector((state) => state.address);

  useEffect(() => {
    // console.log('billing data', data);
    if (addresses?.billing?.length === 0) {
      setIsFirstTime(true);
    } else {
      setIsFirstTime(false);
    }
  }, [data, addresses]);

  return (
    <View style={styles.priceContainer}>
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{title}</Text>
        {withEdit ? (
          <TouchableOpacity
            onPress={() => {
              if (isCheckout) {
                navigation.navigate('AddBillingAdd', {
                  type: type,
                });
              } else {
                navigation.navigate('AddBillingAddress', {
                  type: type,
                });
              }
            }}>
            <Image
              source={appIcons.editIcon}
              resizeMode={'contain'}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {!isFirstTime ? <AddressView type={type} data={addresses} /> : null}
      <View style={styles.spacer} />
    </View>
  );
};

const AddressView = ({type, data}) => {
  if (type === 'Billing') {
    return (
      <Fragment>
        <Text style={styles.text}>
          {data?.billing.billing_first_name} {data?.billing?.billing_last_name}
        </Text>
        {data?.billing?.billing_company !== '' &&
        data?.billing?.billing_company !== 'undefined' ? (
          <Text style={styles.text}>{data?.billing?.billing_company}</Text>
        ) : null}
        <Text style={styles.text}>{data?.billing?.billing_address_1}</Text>
        {data?.billing?.billing_address_2 !== '' && (
          <Text style={styles.text}>{data?.billing?.billing_address_2}</Text>
        )}
        <Text style={styles.text}>
          {data?.billing?.billing_state} {data?.billing?.billing_city}
        </Text>
        <Text style={styles.text}>{data?.billing?.billing_postcode}</Text>
        <Text style={styles.text}>{data?.billing?.billing_country}</Text>
        <Text style={styles.text}>{data?.billing?.billing_phone}</Text>
        <Text style={styles.text}>{data?.billing?.billing_email}</Text>
      </Fragment>
    );
  }
  return (
    <Fragment>
      {data?.shipping?.shipping_first_name !== '' ||
      data?.shipping?.shipping_last_name !== '' ? (
        <Text style={styles.text}>
          {data?.shipping?.shipping_first_name}{' '}
          {data?.shipping?.shipping_last_name}
        </Text>
      ) : null}

      {data?.shipping?.shipping_address_1 !== '' && (
        <Text style={styles.text}>{data?.shipping?.shipping_address_1}</Text>
      )}
      {data?.shipping?.shipping_address_2 !== '' && (
        <Text style={styles.text}>{data?.shipping?.shipping_address_2}</Text>
      )}
      {data?.shipping?.shipping_state !== '' ||
      data?.shipping?.shipping_city !== '' ? (
        <Text style={styles.text}>
          {data?.shipping?.shipping_state} {data?.shipping?.shipping_city}
        </Text>
      ) : null}
      <Text style={styles.text}>{data?.shipping?.shipping_postcode}</Text>
      <Text style={styles.text}>{data?.shipping?.shipping_country}</Text>
      <Text style={styles.text}>{data?.shipping?.shipping_method}</Text>
    </Fragment>
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
    fontFamily: family.Montserrat_Bold,
    fontSize: size.small,
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
  form: {
    marginHorizontal: WP('3'),
  },
});

export {BillingAddCard};
