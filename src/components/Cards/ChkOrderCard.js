import React, {Fragment, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import {HP, colors, WP, family, size} from '../../utilities';
import I18n from '../../translation';
import {useSelector} from 'react-redux';

const ChkOrderCard = ({cartTotal}) => {
  const {cart} = useSelector((state) => state.cart);

  useEffect(() => {
    console.log('Cart', cart);
  }, [cartTotal, cart]);

  return (
    <View style={styles.priceContainer}>
      <View style={styles.primaryContainer}>
        <Text style={styles.whiteText}>{I18n.t('product')}</Text>
        <Text style={styles.whiteText}>{I18n.t('total')}</Text>
      </View>
      <Divider />
      {cart?.map((item, index) => (
        <Fragment key={index}>
          <View style={styles.subTotalContainer}>
            <Text style={styles.simpleText}>{item.title} × 1</Text>
            <Text style={styles.simpleText}>
              {cartTotal?.total}
              {/* CHF {parseFloat(item?.line_subtotal)?.toFixed(2)} */}
            </Text>
          </View>
          <Divider />
        </Fragment>
      ))}
      {/* <Divider /> */}
      {/* <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{I18n.t('subtotal')}</Text>
        <Text style={styles.simpleText}>CHF {cartTotal?.subTotal}</Text>
      </View>
      <Divider /> */}
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{I18n.t('total')}</Text>
        <Text style={styles.priceText}>
          {cartTotal?.total}
          {/* CHF {parseFloat(cartTotal?.total).toFixed(2)} */}
        </Text>
      </View>
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
});

export {ChkOrderCard};
