import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import {HP, colors, WP, family, size} from '../../../utilities';
import I18n from '../../../translation';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment/min/moment-with-locales';

const OrderCard = ({item, index}) => {
  let navigation = useNavigation();

  useEffect(() => {
    moment.locale('fr');
  }, [item]);
  return (
    <View key={index} style={styles.priceContainer}>
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{I18n.t('order')}</Text>
        <Text style={styles.simpleText}>#{item.order_id}</Text>
      </View>
      <Divider />
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>Date</Text>
        <Text style={styles.simpleText}>
          {moment(item?.date_created?.date).format('LL')}
        </Text>
      </View>
      <Divider />
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{I18n.t('state')}</Text>
        <Text style={styles.simpleText}>{item?.status}</Text>
      </View>
      <Divider />
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{I18n.t('total')}</Text>
        <Text numberOfLines={1} style={styles.priceText}>
          CHF {item?.total}
        </Text>
      </View>
      <Divider />
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>Actions</Text>
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
          <Icon name={'eyeo'} type={'antdesign'} color={colors.p1} size={22} />
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
    flex: 0.5,
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
    flex: 0.5,
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

export {OrderCard};
