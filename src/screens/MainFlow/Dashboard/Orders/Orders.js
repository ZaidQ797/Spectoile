/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import {TitleHeader, OrderCard} from '../../../../components';
import I18n from '../../../../translation';
import {colors} from '../../../../utilities';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {getOrdersRequest} from '../../../../redux/actions';

const Orders = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);

  useEffect(() => {
    onGetOrders();
  }, []);

  const onGetOrders = () => {
    setLoading(true);
    const cbSuccess = (res) => {
      setOrders(res);
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getOrdersRequest({}, token, cbSuccess, cbFailure));
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
          ) : (
            <FlatList
              data={orders}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
              renderItem={({item, index}) => (
                <OrderCard item={item} index={index} />
              )}
            />
          )}
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default Orders;
