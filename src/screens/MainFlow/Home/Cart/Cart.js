/* eslint-disable quotes */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {useState, Fragment, useEffect} from 'react';
import {SafeAreaView, View, Text, FlatList, ScrollView} from 'react-native';
import styles from './styles';
import {IconHeader, CartCard, Input, IconButton} from '../../../../components';
import I18n from '../../../../translation';
import {Divider, Icon} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import {appImages, colors, appIcons, HP, WP} from '../../../../utilities';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCartRequest,
  removeFromCartRequest,
  applyCoupenRequest,
} from '../../../../redux/actions';
import {ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {color} from 'react-native-reanimated';

const Cart = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCoupenLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupens, setCoupens] = useState([]);
  const [appliedCoupen, setAppliedCoupen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [data, setData] = useState([
    {
      id: 0,
      label: 'Alimentarium',
      price: 'CHF 80.00',
      package: 'Premium Pack',
      image: appImages.cartItemPic,
    },
    {
      id: 1,
      label: 'Alimentarium',
      price: 'CHF 80.00',
      package: 'Premium Pack',
      image: appImages.cartItemPic,
    },
    {
      id: 2,
      label: 'Alimentarium',
      price: 'CHF 80.00',
      package: 'Premium Pack',
      image: appImages.cartItemPic,
    },
  ]);

  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state.cart);
  const {token} = useSelector((state) => state.login);

  useEffect(() => {
    onGetCart();
    onApplyCoupen('status');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetCart = (type = 'abc') => {
    if (type !== 'coupon') setLoading(true);
    const cbSuccess = (res) => {
      console.log(res);
      let newTotal = 0;
      let newSubTotal = 0;
      res?.forEach((elem) => {
        newTotal = newTotal + elem?.line_total;
        newSubTotal = newSubTotal + elem?.line_subtotal;
      });
      console.log(newTotal);
      console.log(newSubTotal);
      setTotal(newTotal);
      setSubtotal(newSubTotal);
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getCartRequest({}, token, cbSuccess, cbFailure));
  };

  const onRemoveCart = (key) => {
    let params = new FormData();
    params.append('cart_item_key', key);
    const cbSuccess = () => {
      onGetCart();
      onApplyCoupen('status');
      // onApplyCoupen('status');
    };
    const cbFailure = () => {};
    dispatch(removeFromCartRequest(params, token, cbSuccess, cbFailure));
  };

  const onApplyCoupen = (action, item = null) => {
    let params = new FormData();
    if (action === 'status') {
      params.append('action', 'remove');
      params.append('coupon_code', '');
      params.append('status', 'checked');
    } else {
      if (item) {
        params.append('coupon_code', item.coupon_code);
        params.append('action', action);
      } else {
        params.append('coupon_code', promoCode?.trim());
        params.append('action', action);
      }
    }
    if (action !== 'remove') setCoupenLoading(true);
    const cbSuccess = (res) => {
      if (res?.status === 'success') {
        setPromoCode('');
        console.log('success res', res);
        if (res?.data) {
          setCoupens(res.data);
        } else {
          setCoupens([]);
        }
        setTotal(res.grand_total.total);
        setSubtotal(res.grand_total.subtotal);
        setCoupenLoading(false);
        onGetCart('coupon');
        if (action !== 'status') {
          Snackbar.show({
            text: res?.message || I18n.t('promo_code_validation'),
            backgroundColor: colors.snackGreen,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      } else {
        setPromoCode('');
        console.log('error res', res);
        setCoupenLoading(false);
        onGetCart('coupon');
        if (action !== 'status') {
          Snackbar.show({
            text: res?.message || I18n.t('promo_code_validation'),
            backgroundColor: colors.snackRed,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      }
    };
    const cbFailure = () => {
      Snackbar.show({
        text: I18n.t('promo_code_validation'),
        backgroundColor: colors.snackGreen,
        duration: Snackbar.LENGTH_SHORT,
      });
      setCoupenLoading(false);
    };
    dispatch(applyCoupenRequest(params, token, cbSuccess, cbFailure));
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <IconHeader
          onLeftPress={() => navigation.toggleDrawer()}
          onSearchPress={() => navigation.navigate('Search')}
          onHeartPress={() => navigation.navigate('Favorites')}
        />
        <View style={styles.body}>
          <View style={styles.basketView}>
            <Text style={styles.basketText}>{I18n.t('basket')}</Text>
          </View>
          <View style={styles.innerBody}>
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              {loading ? (
                <View style={styles.cartListLoaderContainer}>
                  <ActivityIndicator color={colors.p1} />
                </View>
              ) : (
                <View style={styles.flatlistContainer}>
                  <FlatList
                    data={cart}
                    keyExtractor={(item, index) => item + index.toString()}
                    contentContainerStyle={styles.flatlist}
                    renderItem={({item, index}) => (
                      <CartCard
                        index={index}
                        item={item}
                        localizedPrice={route?.params?.item?.localizedPrice}
                        onDelete={onRemoveCart}
                      />
                    )}
                  />
                </View>
              )}
              {/* <Input
                placeholder={'Code promo'}
                value={promoCode}
                onChangeText={(text) => setPromoCode(text)}
                style={styles.input}
              />
              <View style={styles.spacer} />
              <IconButton
                title={I18n.t('apply_promo_code')}
                backgroundColor={colors.p1}
                icon={appIcons.promoCodeIcon}
                iconColor={colors.white}
                loaderColor={colors.white}
                isLoading={couponLoading}
                titleColor={colors.white}
                style={styles.loginButton}
                onSubmit={() => {
                  if (promoCode !== '' && total !== 0) {
                    onApplyCoupen('apply');
                  } else {
                    Snackbar.show({
                      text: I18n.t('promo_code_validation'),
                      backgroundColor: colors.snackRed,
                      duration: Snackbar.LENGTH_SHORT,
                    });
                  }
                }}
              /> */}
              <View style={styles.spacer} />
              <View style={styles.spacer} />
              <IconButton
                title={I18n.t('update_basket')}
                backgroundColor={colors.p2}
                icon={appIcons.buyPackIcon}
                iconColor={colors.white}
                titleColor={colors.white}
                style={styles.loginButton}
                onSubmit={() => {
                  navigation.pop();
                }}
              />
              <View style={styles.spacer} />
              <Text style={styles.boldText}>{I18n.t('basket_total')}</Text>
              <View
                style={[
                  styles.priceContainer,
                  {
                    height: coupens.length === 0 ? HP('11') : HP('20'),
                  },
                ]}>
                <View style={styles.subTotalContainer}>
                  <Text style={styles.simpleText}>{I18n.t('subtotal')}</Text>
                  <Text style={styles.simpleText}>
                    {/* CHF {parseFloat(subTotal)?.toFixed(2)} */}
                    {route?.params?.item?.localizedPrice}
                  </Text>
                </View>
                <Divider />
                {coupens?.length > 0
                  ? coupens.map((item, index) => (
                      <Fragment key={index}>
                        <View style={styles.subTotalContainer}>
                          <Text
                            numberOfLines={1}
                            style={[styles.simpleText, {width: WP('50')}]}>
                            Coupen: {item.coupon_code}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={[
                                styles.simpleText,
                                {
                                  alignSelf: 'center',
                                },
                              ]}>
                              - CHF {item.coupon_discount}{' '}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                onApplyCoupen('remove', item);
                              }}>
                              <Icon
                                type={'material'}
                                name={'delete'}
                                color={colors.snackRed}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <Divider />
                      </Fragment>
                    ))
                  : null}
                <View style={styles.totalContainer}>
                  <Text style={styles.simpleText}>{I18n.t('total')}</Text>
                  <Text style={styles.priceText}>
                    {/* CHF {parseFloat(total)?.toFixed(2)} */}
                    {route?.params?.item?.localizedPrice}
                  </Text>
                </View>
              </View>
              <View style={styles.spacer} />
              <View style={styles.spacer} />
              <View style={styles.spacer} />
              <IconButton
                title={I18n.t('validate_order')}
                backgroundColor={colors.p1}
                icon={appIcons.validateBtnIcon}
                iconColor={colors.white}
                titleColor={colors.white}
                style={styles.loginButton}
                onSubmit={() => {
                  if (cart?.length !== 0) {
                    navigation.navigate('Checkout', {
                      cart_total: {
                        // total: total,
                        total: route?.params?.item?.localizedPrice,
                        // subTotal: subTotal,
                        subTotal: route?.params?.item?.localizedPrice,
                      },
                    });
                  } else {
                    alert(`Veuillez sélectionner au moins un package`);
                  }
                }}
              />
            </KeyboardAwareScrollView>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default Cart;
