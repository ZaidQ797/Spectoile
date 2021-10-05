import React, {Fragment, useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  TitleHeader,
  AddPaymentCard,
  IconButton,
  PaymentGTCard,
} from '../../../../components';
import I18n from '../../../../translation';
import {colors, appIcons} from '../../../../utilities';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPaymentGatewaysRequest,
  deletePaymentGetewayRequest,
} from '../../../../redux/actions';
import {useIsFocused} from '@react-navigation/native';

const PaymentMeans = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {paymentGateways} = useSelector((state) => state.orders);

  useEffect(() => {
    if (isFocused) {
      onGetPaymentsGT();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onGetPaymentsGT = (type = 'fetch') => {
    type !== 'delete' ? setLoading(true) : null;
    const cbSuccess = (res) => {
      // setOrders(res.data);
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getPaymentGatewaysRequest({}, token, cbSuccess, cbFailure));
  };

  const onDeletePaymentsGT = (id) => {
    const data = new FormData();
    data.append('wc-stripe-payment-token', id);
    const cbSuccess = (res) => {
      if (res.status === 'success') {
        setLoading(false);
        onGetPaymentsGT('delete');
      }
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(deletePaymentGetewayRequest(data, token, cbSuccess, cbFailure));
  };

  const onAddPaymentPress = () => {
    navigation.navigate('AddPaymentMethod', {
      item: route?.params?.item?.label,
    });
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.goBack()}
          title={route?.params?.item?.label}
        />
        <View style={styles.body}>
          {loading ? (
            <View style={styles.centerView}>
              <ActivityIndicator size={'large'} animating color={colors.p1} />
            </View>
          ) : paymentGateways.length === 0 ? (
            <AddPaymentCard
              title={I18n.t('no_ways_found')}
              btnType={'addpayment'}
              onPress={onAddPaymentPress}
            />
          ) : (
            <FlatList
              data={paymentGateways}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
              renderItem={({item, index}) => (
                <PaymentGTCard
                  item={item}
                  index={index}
                  onDelete={onDeletePaymentsGT}
                />
              )}
            />
          )}
          {paymentGateways.length !== 0 ? (
            <IconButton
              title={I18n.t('add_payment_method')}
              backgroundColor={colors.p1}
              icon={appIcons.plusIcon}
              iconColor={colors.white}
              style={styles.loginButton}
              titleColor={colors.white}
              onSubmit={() => {
                onAddPaymentPress();
              }}
            />
          ) : null}
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default PaymentMeans;
