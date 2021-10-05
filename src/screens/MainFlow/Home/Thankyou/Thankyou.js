import React from 'react';
import {Text, View, SafeAreaView, ImageBackground} from 'react-native';
import {SingleHeader} from '../../../../components';
import styles from './styles';
import {StackActions} from '@react-navigation/native';
import {Divider} from 'react-native-elements';
import {appImages} from '../../../../utilities';
import I18n from '../../../../translation';
import moment from 'moment';

const Thankyou = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.main}>
      <SingleHeader
        onLeftPress={() => {
          navigation.dispatch(StackActions.popToTop());
          navigation.navigate('App');
        }}
      />
      <View style={styles.body}>
        <View style={styles.merciCard}>
          <ImageBackground
            source={appImages.merciBG}
            resizeMode="contain"
            style={styles.merciBg}>
            <Text style={styles.merciText}>{I18n.t('thank_you')}</Text>
          </ImageBackground>
          <Text style={styles.simpleText}>{I18n.t('order_recieved')}</Text>
          <Row
            label={I18n.t('order_no')}
            value={route?.params?.orderInfo?.order_id}
          />
          <Divider style={styles.divider} />
          <Row
            label={'Date'}
            value={moment(route?.params?.orderInfo?.created_at?.date).format(
              'LL',
            )}
          />
          <Divider style={styles.divider} />
          <Row label={'E-mail'} value={route?.params?.orderInfo?.email} />
          <Divider style={styles.divider} />
          <Row
            label={'Total'}
            value={route?.params?.localizedPrice}
            // value={'CHF' + route?.params?.orderInfo?.amount}
          />
          <Divider style={styles.divider} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const Row = ({label, value}) => (
  <View style={styles.rowCotainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default Thankyou;
