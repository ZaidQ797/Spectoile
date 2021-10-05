/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import {HP, colors, WP, family, size} from '../../../utilities';
import I18n from '../../../translation';
import {Spacer} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const PaymentGTCard = ({item, index, onDelete}) => {
  let navigation = useNavigation();
  return (
    <View key={index} style={styles.priceContainer}>
      {/* <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{I18n.t('order')}</Text>
        <Text style={styles.simpleText}>{item.display_name}</Text>
      </View> */}
      {/* <Spacer />
      <Text style={[styles.simpleText, {left: 10}]}>{item.display_name}</Text>
      <Spacer /> */}
      {/* <Divider /> */}
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{item.display_name}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OrderDetail', {
              item: {
                label: 'Détails de la commande',
                id: item.order_id,
              },
            })
          }
          style={styles.actionView}>
          <Icon
            onPress={() => onDelete(item.wc_stripe_payment_token)}
            name={'delete'}
            type={'material'}
            color={colors.p1}
            size={22}
          />
          <Text
            style={[
              styles.simpleText,
              // eslint-disable-next-line react-native/no-inline-styles
              {left: 4, fontSize: size.xtiny, color: colors.p1},
            ]}>
            {item?.action}
          </Text>
        </TouchableOpacity>
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
    padding: WP('2'),
  },
  scrollView: {
    paddingBottom: HP('14'),
  },
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WP('3'),
    height: HP('5.5'),
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
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  whiteText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.xsmall,
    color: colors.white,
  },
  priceText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
    flex: 0.2,
  },
  divider: {
    width: '100%',
  },
  actionView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export {PaymentGTCard};
