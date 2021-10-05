import React, {Fragment, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TitleHeader, CartCard, BillingAddCard} from '../../../../../components';
import {colors} from '../../../../../utilities';
import styles from './styles';
import {Divider} from 'react-native-elements';
import I18n from '../../../../../translation';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderDetailRequest} from '../../../../../redux/actions';
// import moment from 'moment';
import moment from 'moment/min/moment-with-locales';

const OrderDetail = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {orderDetail} = useSelector((state) => state.orders);

  useEffect(() => {
    moment.locale('fr');
  }, []);

  // const [data, setData] = useState([
  //   {
  //     id: 0,
  //     title: 'Alimentarium',
  //     line_total: '80',
  //     package: 'Premium Pack',
  //     image: appImages.cartItemPic,
  //   },
  //   {
  //     id: 1,
  //     title: 'Alimentarium',
  //     line_total: '30',
  //     package: 'Premium Pack',
  //     image: appImages.cartItemPic,
  //   },
  //   {
  //     id: 2,
  //     title: 'Alimentarium',
  //     line_total: '0',
  //     package: 'Premium Pack',
  //     image: appImages.cartItemPic,
  //   },
  // ]);

  useEffect(() => {
    onGetOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.item?.id]);

  const onGetOrderDetail = () => {
    let params = new FormData();
    params.append('order_id', route?.params?.item?.id);
    setLoading(true);
    const cbSuccess = (res) => {
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getOrderDetailRequest(params, token, cbSuccess, cbFailure));
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.statusText}>
                La commande{' '}
                <Text style={styles.highlightedText}>#{orderDetail?.id}</Text> a
                été effectué le{' '}
                <Text style={styles.highlightedText}>
                  {moment(orderDetail?.date_created?.date).format('ll')}
                </Text>{' '}
                et est actuellement{' '}
                <Text style={styles.highlightedText}>
                  {orderDetail?.status}.
                </Text>
              </Text>
              <Text style={styles.orderdetailtext}>
                {route?.params?.item?.label}
              </Text>
              <View style={styles.spacer} />
              <View style={styles.flatlistContainer}>
                <FlatList
                  data={orderDetail?.packages}
                  keyExtractor={(item, index) => item + index.toString()}
                  contentContainerStyle={styles.flatlist}
                  renderItem={({item, index}) => (
                    <CartCard index={index} item={item} withCrossIcon={false} />
                  )}
                />
              </View>
              <View style={styles.priceContainer}>
                {/* <View style={styles.subTotalContainer}>
                  <Text style={styles.simpleText}>{I18n.t('subtotal')}</Text>
                  <Text style={styles.simpleText}>
                    {I18n.t('basket_total')}
                  </Text>
                </View> */}
                <Divider />
                <View style={styles.subTotalContainer}>
                  <Text style={styles.simpleText}>Mode de paiement</Text>
                  <Text style={styles.simpleText}>
                    {orderDetail?.payment_method_title}
                  </Text>
                </View>
                <Divider />
                <View style={styles.totalContainer}>
                  <Text style={styles.simpleText}>{I18n.t('total')}</Text>
                  <Text style={styles.priceText}>CHF {orderDetail?.total}</Text>
                </View>
              </View>
              <View style={styles.spacer} />
              <View style={styles.spacer} />
              <BillingAddCard
                title={I18n.t('billing_address')}
                type={'Billing'}
                data={orderDetail?.billing}
                withEdit={false}
              />
              <View style={styles.spacer} />
              <View style={styles.spacer} />
              <View style={styles.spacer} />
              {/* <IconButton
                title={'Commander à nouveau'}
                backgroundColor={colors.p1}
                icon={appIcons.loginIcon}
                iconColor={colors.white}
                style={styles.loginButton}
                titleColor={colors.white}
                onSubmit={() => {}}
                withIcon={false}
              /> */}
              <View style={styles.spacer} />
              <View style={styles.spacer} />
              <View style={styles.spacer} />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default OrderDetail;
