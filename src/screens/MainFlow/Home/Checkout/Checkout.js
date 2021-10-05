/* eslint-disable dot-notation */
/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable radix */
import React, {Fragment, useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  Image,
  Alert,
} from 'react-native';
import {
  IconHeader,
  ProfileCard,
  ChkOrderCard,
  PaymentCard,
  IconButton,
  Spacer,
  BillingAddCard,
  RecentStripeCards,
} from '../../../../components';
import styles from './styles';
import {CheckBox} from 'react-native-elements';
import {appIcons, colors} from '../../../../utilities';
import I18n from '../../../../translation';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAddresses,
  getProfileRequest,
  checkoutNonceRequest,
  placeOrderRequest,
  getPaymentGatewaysRequest,
} from '../../../../redux/actions';
import {LiteCreditCardInput} from 'react-native-credit-card-input';
import Snackbar from 'react-native-snackbar';
import stripe from 'tipsi-stripe';
import {CommonActions} from '@react-navigation/routers';
import {PaymentRequest} from 'react-native-payments';
import * as RNIap from 'react-native-iap';

//Sandbox Account
//email: mirzahayat009@gmail.com
//password: Apple_90

// let purchaseUpdatedListener;
// let purchaseErrorListener;

const Checkout = ({navigation, route}) => {
  const isFocusd = useIsFocused();

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);
  const {addresses} = useSelector((state) => state.address);
  const {checkoutNonce} = useSelector((state) => state.orders);
  const {cart} = useSelector((state) => state.cart);

  const [cartTotal, setCartTotal] = useState(route?.params.cart_total);
  const [loading, setLoading] = useState(false);
  const [applePayLoading, setApplePayLoading] = useState(false);
  const [payments, setPayments] = useState([
    {
      id: 0,
      label: I18n.t('bank_transfer'),
      type: 'bacs',
      selected: true,
    },
    // {
    //   id: 1,
    //   label: 'PayPal',
    //   type: 'paypal',
    //   selected: false,
    // },
    {
      id: 2,
      label: I18n.t('stripe_payment'),
      type: 'stripe',
      selected: false,
    },
  ]);
  const [recentCards, setRecentCards] = useState([]);
  const [canApplePay, setCanApplePay] = useState(false);
  const [payCart, setPayCart] = useState([]);
  const [paymentGateway, setPaymentGateway] = useState('');
  const [addNewCard, setAddNewCard] = useState('');
  const [cardInfo, setCardInfo] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  useEffect(() => {
    if (isFocusd) {
      setCartTotal(cartTotal);
      onGetProfile();
      onGetAddress();
      onGetCheckoutNonce();
      onGetStripeCards();
      preparePayCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocusd]);

  useEffect(() => {
    // console.log('cartTotal', cartTotal);
    let selectedCard = recentCards?.filter((elem) => elem.selected)[0];
    setAddNewCard(selectedCard);
  }, [addresses, cartTotal, recentCards]);

  const preparePayCart = async () => {
    let canMakePayment = await stripe.canMakeNativePayPayments();
    setCanApplePay(canMakePayment);
    let array = cart?.map((item) => {
      return {
        label: item.title,
        amount: {currency: 'CHF', value: `${item.line_total}`},
      };
    });
    setPayCart(array);
  };

  useEffect(() => {}, [canApplePay]);

  const onGetProfile = () => {
    const cbSuccess = (_res) => {};
    const cbFailure = (_err) => {};
    dispatch(getProfileRequest({}, token, cbSuccess, cbFailure));
  };

  const onGetAddress = () => {
    const cbSuccess = (_res) => {};
    const cbFailure = (_err) => {};
    dispatch(getAddresses({}, token, cbSuccess, cbFailure));
  };

  const onGetCheckoutNonce = () => {
    const cbSuccess = (_res) => {};
    const cbFailure = (_err) => {};
    dispatch(checkoutNonceRequest({}, token, cbSuccess, cbFailure));
  };

  const onGetStripeCards = () => {
    const cbSuccess = (res) => {
      let newArry = res.concat({
        display_name: 'Utilisez un nouveau mode de paiement',
        selected: false,
        wc_stripe_payment_token: 'defaulttoken',
      });
      setRecentCards(newArry);
    };
    const cbFailure = (_err) => {};
    dispatch(getPaymentGatewaysRequest({}, token, cbSuccess, cbFailure));
  };

  const onCardSelection = (item) => {
    setRecentCards(
      recentCards.map((elem) => {
        elem.selected = false;
        if (elem.wc_stripe_payment_token === item.wc_stripe_payment_token) {
          return {
            ...item,
            selected: !elem.selected,
          };
        }
        return elem;
      }),
    );
  };

  const onPlaceOrder = async (
    type = '',
    stripeToken = null,
    options = null,
  ) => {
    try {
      console.log(type);
      console.log(stripeToken);
      if (type !== 'applepay') {
        setLoading(true);
      } else {
        setApplePayLoading(true);
      }
      let data, payGateway;
      if (type === 'zerocart' || type === 'applepay' || type === 'in_app') {
        data = await preparePlaceOrderData(type, null, stripeToken, null);
      } else {
        payGateway = payments?.filter((item) => item.selected);
        data = await preparePlaceOrderData(
          type,
          payGateway,
          stripeToken,
          options,
        );
      }

      console.log('data from order api', data);

      const cbSuccess = async (res) => {
        if (type === 'in_app') {
          setLoading(false);
          console.log('_res', res);
          await RNIap.finishTransactionIOS(res.reciept);
          await RNIap.clearTransactionIOS();
          // res.receipt.in_app.forEach(async (element) => {
          //   await RNIap.finishTransactionIOS(element.transaction_id);
          // });
        } else if (type !== 'applepay') {
          setLoading(false);
        } else {
          setApplePayLoading(false);
        }
        if (res?.status === 'success') {
          Snackbar.show({
            text: res?.message || I18n.t('promo_code_validation'),
            backgroundColor: colors.snackGreen,
            duration: Snackbar.LENGTH_SHORT,
          });
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Thankyou',
                  params: {
                    orderInfo: res?.data,
                    localizedPrice: cartTotal?.total,
                  },
                },
              ],
            }),
          );
        } else {
          setLoading(false);
          Snackbar.show({
            text: `Désolé, la commande a échoué en raison d'un problème. Veuillez réessayer`,
            backgroundColor: colors.snackRed,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      };
      const cbFailure = (_err) => {
        if (type !== 'applepay') {
          setLoading(false);
        } else {
          setApplePayLoading(false);
        }
        Snackbar.show({
          text: `Désolé, la commande a échoué en raison d'un problème. Veuillez réessayer`,
          backgroundColor: colors.snackRed,
          duration: Snackbar.LENGTH_SHORT,
        });
      };
      dispatch(placeOrderRequest(data, token, cbSuccess, cbFailure));
    } catch (err) {
      alert(err);
    }
  };

  const preparePlaceOrderData = async (
    type,
    payGateway,
    stripeToken,
    options,
  ) => {
    let data = new FormData();
    if (type === 'in_app') {
      data.append('payment_method', 'apple_receipt');
      data.append('receipt', stripeToken);
    } else if (type === 'applepay') {
      data.append('wc-stripe-payment-token', stripeToken);
      data.append('payment_method', 'stripe_applepay');
    } else if (type !== 'zerocart') {
      let selectedCard = recentCards?.filter((elem) => elem.selected)[0];
      let paymentMethod = payGateway[0].type;
      if (paymentMethod === 'stripe') {
        switch (type) {
          case 'stripe_new_card':
            if (saveCard) {
              data.append('wc-stripe-new-payment-method', saveCard);
            }
            data.append('stripe_source', stripeToken?.sourceId);
            data.append('card[number]', options?.number);
            data.append('card[cvc]', options?.cvv);
            data.append('card[exp_month]', options?.expMonth);
            data.append('card[exp_year]', options?.expYear);
            break;
          case 'stripe_prev_card':
            data.append(
              'wc-stripe-payment-token',
              selectedCard?.wc_stripe_payment_token,
            );
            break;
          default:
            return;
        }
      }
      data.append('payment_method', payGateway[0].type);
    } else {
      data.append('payment_method', type);
    }
    data.append('woocommerce-process-checkout-nonce', checkoutNonce);
    data.append('billing_first_name', addresses?.billing?.billing_first_name);
    data.append('billing_last_name', addresses?.billing?.billing_last_name);
    data.append('billing_company', addresses?.billing?.billing_company);
    data.append('billing_address_1', addresses?.billing?.billing_address_1);
    data.append('billing_address_2', addresses?.billing?.billing_address_2);
    data.append('billing_city', addresses?.billing?.billing_city);
    data.append('billing_postcode', addresses?.billing?.billing_postcode);
    data.append('billing_country', addresses?.billing?.billing_country);
    data.append('billing_state', addresses?.billing?.billing_state);
    data.append('billing_phone', addresses?.billing?.billing_phone);
    data.append('billing_email', addresses?.billing?.billing_email);
    return data;
  };

  useEffect(() => {
    // console.log(cardInfo);
  }, [cardInfo]);

  const payWithStripe = async () => {
    try {
      if (cardInfo !== '') {
        if (!cardInfo?.valid) {
          alert(`La carte n'est pas valide. Veuillez réessayer`);
          return;
        }
        setLoading(true);
        const str = cardInfo?.values?.expiry?.split('/');
        const options = {
          type: 'card',
          number: cardInfo?.values?.number,
          expMonth: parseInt(str[0]),
          expYear: parseInt(str[1]),
          cvv: cardInfo?.values?.cvc,
        };
        const stripe_token = await stripe.createSourceWithParams(options);
        onPlaceOrder('stripe_new_card', stripe_token, options);
      } else {
        alert('Veuillez saisir les détails de la carte pour continuer');
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  const onRadioPress = (id) => {
    setPayments(
      payments.map((item) => {
        item.selected = false;
        if (item.id === id) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      }),
    );
    setRecentCards(
      recentCards.map((item) => {
        item.selected = false;
        return item;
      }),
    );
    setAddNewCard('');
  };

  useEffect(() => {
    let results = payments.filter((elem) => elem.selected);
    setPaymentGateway(results[0].type);
  }, [payments]);

  const validateBilling = () => {
    if (
      addresses?.billing?.billing_first_name === '' ||
      addresses?.billing?.billing_last_name === '' ||
      addresses?.billing?.billing_address_1 === '' ||
      addresses?.billing?.billing_address_2 === '' ||
      addresses?.billing?.billing_city === '' ||
      addresses?.billing?.billing_postcode === '' ||
      addresses?.billing?.billing_country === '' ||
      addresses?.billing?.billing_state === '' ||
      addresses?.billing?.billing_phone === '' ||
      addresses?.billing?.billing_email === ''
    ) {
      alert('Veuillez saisir tous les champs pour continuer');
      return false;
    }
    return true;
  };

  //Latest method for using stripe and bank transfer
  const onProcessPayment = () => {
    try {
      //Billing Address Validation
      if (!validateBilling()) {
        return;
      }
      if (cartTotal?.total !== 0) {
        //Payment Gateway Check
        if (paymentGateway === 'stripe') {
          //getting selected card for stripe
          let selectedCard = recentCards?.filter((elem) => elem.selected);
          //Cards Validation one Card should be selected
          if (selectedCard?.length === 0) {
            alert(
              'Veuillez sélectionner une carte de crédit ou ajouter une nouvelle carte',
            );
            return;
          }
          //Validation for Already Added Cards and New Card
          if (selectedCard[0]?.wc_stripe_payment_token === 'defaulttoken') {
            payWithStripe();
          } else {
            onPlaceOrder('stripe_prev_card');
          }
        } else if (paymentGateway === 'bacs') {
          onPlaceOrder('bank');
        }
      } else {
        onPlaceOrder('zerocart');
      }
    } catch (err) {
      alert(err);
    }
  };

  const onProcessApplePay = async () => {
    try {
      //Billing Address Validation
      if (!validateBilling()) {
        return;
      }
      if (cartTotal?.total !== 0) {
        let items = cart?.map((item) => {
          return {
            label: item.title,
            amount: item.line_total?.toString(),
          };
        });
        items.push({
          label: `Idées Sorties, Inc`,
          amount: cartTotal?.total?.toString(),
        });
        console.log(items);
        // const items = [
        //   {
        //     label: 'Whisky',
        //     amount: '50.00',
        //   },
        //   {
        //     label: 'Tipsi, Inc',
        //     amount: '50.00',
        //   },
        // ];

        const options = {
          // requiredBillingAddressFields: 'all',
          // requiredShippingAddressFields: 'all',
          // shippingMethods,
          currencyCode: 'CHF',
        };

        let canMakePayment = await stripe.canMakeNativePayPayments();
        if (canMakePayment) {
          const applePayRes = await stripe.paymentRequestWithNativePay(
            options,
            items,
          );
          console.log('ApplePayRes', applePayRes);
          // Client specific code
          // api.sendTokenToBackend(token)
          onPlaceOrder('applepay', applePayRes.tokenId);
          // You should complete the operation by calling
          await stripe.completeNativePayRequest();
        } else {
          alert(`Désolé, Apple Pay n'est pas disponible sur votre appareil.`);
        }
      } else {
        onPlaceOrder('zerocart');
      }
    } catch (err) {
      console.log(err);
      // alert(err);
    }
  };

  const onProcessWithBrainTree = async () => {
    try {
      const METHOD_DATA = [
        {
          supportedMethods: ['apple-pay'],
          data: {
            merchantIdentifier: 'merchant.spectetoile.ideessorites',
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            countryCode: 'CH',
            currencyCode: 'CHF',
            paymentMethodTokenizationParameters: {
              parameters: {
                gateway: 'stripe',
                'stripe:publishableKey': 'pk_test_gF6KEPqLdGOc8MDBBf6u6Sqc',
                //'stripe:version': '5.0.0', // Only required on Android
              },
            },
          },
        },
      ];
      const DETAILS = {
        id: 'basic-example',
        displayItems: payCart,
        total: {
          label: `Idées Sorties, Inc`,
          amount: {currency: 'CHF', value: `${cartTotal?.total}`},
        },
      };
      const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
      paymentRequest
        .show()
        .then(async (paymentResponse) => {
          let stripeToken = await paymentResponse?.details?.paymentToken;
          if (stripeToken !== undefined || stripeToken !== null) {
            onPlaceOrder('applepay', stripeToken);
            paymentResponse.complete('success');
          } else {
            alert(
              `Une erreur s'est produite lors du paiement. Veuillez réessayer`,
            );
          }
        })
        .catch((error) => {
          if (error.message === 'AbortError') {
            this.debug('Payment request was dismissed');
          }
        });
    } catch (err) {
      alert(err);
    }
  };

  //In-App Purhcase useEffect
  useEffect(() => {
    let purchaseUpdatedListener, purchaseErrorListener;
    RNIap.initConnection().then(async () => {
      await RNIap.clearTransactionIOS();
      purchaseUpdatedListener = RNIap.purchaseUpdatedListener(
        async (purchase) => {
          try {
            setLoading(true);
            const reciept = purchase.transactionReceipt;
            console.log('Latest Receipt', reciept);
            if (reciept) {
              const ackResult = await RNIap.finishTransaction(purchase);
              console.log('ackResult', ackResult);
              onPlaceOrder('in_app', reciept, purchase);
            }
            //Send it to backend for futher processing
          } catch (err) {
            console.log(err);
          }
        },
      );

      purchaseErrorListener = RNIap.purchaseErrorListener((error) => {
        console.log('error', error);
        if (error['responseCode'] === '2') {
          //user canceled
        } else {
          Alert.alert(
            'Error',
            'There has been an error with your purchase, error code = ' +
              error['code'],
          );
        }
      });
    });

    return () => {
      purchaseUpdatedListener?.remove();
      purchaseErrorListener?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Method for handling In-App Purhcase
  const onProcessInApp = async () => {
    try {
      let isAppPurchaseItem = cart[0]?.apple_product_id !== '' ? true : false;
      if (isAppPurchaseItem) {
        //implement In-App Payment
        console.log('In-App purchase item', cart[0]?.apple_product_id);
        await RNIap.requestSubscription(cart[0]?.apple_product_id);
      } else {
        //Zero Cart
        console.log('free pack');
        onPlaceOrder('zerocart');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <IconHeader
          onLeftPress={() => navigation.toggleDrawer()}
          onSearchPress={() => navigation.navigate('Search')}
          onHeartPress={() => navigation.navigate('Favorites')}
        />
        <View style={styles.bodyContainer}>
          <View style={styles.basketView}>
            <Text style={styles.basketText}>{I18n.t('checkout')}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.body}>
              <ProfileCard />
              <BillingAddCard
                title={I18n.t('billing_address')}
                type={'Billing'}
                isCheckout
              />
              <Spacer />
              <Text style={styles.yourOrderText}>{I18n.t('your_order')}</Text>
              <ChkOrderCard cartTotal={cartTotal} />
              <Spacer />
              <Spacer />
              {/* stripe view */}
              {/* {cartTotal?.total !== 0 ? (
                <PaymentCard payments={payments} onRadioPress={onRadioPress} />
              ) : null} */}
              {/* {paymentGateway === 'stripe' ? (
                <Fragment>
                  <Spacer />
                  <RecentStripeCards
                    recentCards={recentCards}
                    onCardSelection={onCardSelection}
                  />
                  <Spacer />
                </Fragment>
              ) : null} */}

              {/* {addNewCard?.wc_stripe_payment_token === 'defaulttoken' ? (
                <Fragment>
                  <LiteCreditCardInput
                    allowScroll
                    validColor={'black'}
                    invalidColor={'red'}
                    placeholderColor={'darkgray'}
                    onChange={(data) => setCardInfo(data)}
                  />
                  <Spacer />
                  <View style={styles.saveCardCheckContainer}>
                    <CheckBox
                      checked={saveCard}
                      checkedColor={colors.p1}
                      onPress={() => setSaveCard(!saveCard)}
                      containerStyle={styles.checkBoxContainer}
                    />
                    <Text style={styles.saveText}>
                      {I18n.t('save_card_future')}
                    </Text>
                  </View>
                </Fragment>
              ) : null} */}
              {/* {cartTotal?.total !== 0 ? (
                <Text numberOfLines={4} style={styles.paymentQoute}>
                  {I18n.t('payment_qoute')}
                </Text>
              ) : null} */}
              {/* {cartTotal?.total !== 0 && canApplePay ? (
                <Fragment>
                  <Spacer />
                  <Spacer />
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => {
                      onProcessApplePay();
                      // onProcessWithBrainTree();
                    }}>
                    {applePayLoading ? (
                      <ActivityIndicator animating color={colors.black} />
                    ) : (
                      <Fragment>
                        <Image
                          source={appIcons.applePayIcon}
                          style={styles.applePayIcon}
                          resizeMode={'contain'}
                        />
                        <Text style={styles.payBtnTexT}>
                          Pay with Apple Pay
                        </Text>
                      </Fragment>
                    )}
                  </TouchableOpacity>
                </Fragment>
              ) : null} */}
              <Spacer />
              <IconButton
                title={`S'abonner`}
                backgroundColor={colors.p1}
                icon={appIcons.validateBtnIcon}
                iconColor={colors.white}
                titleColor={colors.white}
                style={styles.loginButton}
                loaderColor={colors.white}
                isLoading={loading}
                onSubmit={() => {
                  //<-----------------Stripe + Bank Transfer ----------------->
                  // onProcessPayment();
                  //<-----------------In-App Purchase ----------------->
                  if (addresses?.billing?.length === 0) {
                    alert(
                      'Veuillez saisir votre adresse de facturation pour continuer',
                    );
                  } else {
                    onProcessInApp();
                  }
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default Checkout;
