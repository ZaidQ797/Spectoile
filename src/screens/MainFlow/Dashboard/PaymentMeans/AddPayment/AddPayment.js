/* eslint-disable radix */
/* eslint-disable no-alert */
import React, {useState, Fragment} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {TitleHeader, IconButton} from '../../../../../components';
import I18n from '../../../../../translation';
import {appIcons, colors} from '../../../../../utilities';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CreditCardInput} from 'react-native-credit-card-input';
import stripe from 'tipsi-stripe';
import {addPaymentGetewayRequest} from '../../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const AddPayment = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(null);

  const {token} = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onChange = (form) => {
    setCard({data: form.values});
  };

  const addCardWithStripe = async () => {
    try {
      setLoading(true);
      const str = card.data.expiry.split('/');
      const options = {
        type: 'card',
        number: card.data.number,
        expMonth: parseInt(str[0]),
        expYear: parseInt(str[1]),
        cvv: card.data.cvc,
      };
      const stripe_token = await stripe.createSourceWithParams(options);
      let params = new FormData();
      params.append('card[number]', options.number);
      params.append('card[cvc]', options.cvv);
      params.append('card[exp_month]', options.expMonth);
      params.append('card[exp_year]', options.expYear);
      params.append('stripe_source', stripe_token.sourceId);
      const cbSuccess = (res) => {
        if (res.result === 'success') {
          setLoading(false);
          navigation.pop();
        } else {
          alert(res.result);
        }
      };
      const cbFailure = () => {
        setLoading(false);
      };
      dispatch(addPaymentGetewayRequest(params, token, cbSuccess, cbFailure));
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.goBack()}
          title={route?.params?.item}
        />
        <View style={styles.body}>
          <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
            <Text style={styles.qoute}>{I18n.t('stripe_qoute')}</Text>
            <CreditCardInput
              autoFocus
              requiresName
              requiresCVC
              requiresPostalCode
              allowScroll
              validColor={'black'}
              invalidColor={'red'}
              placeholderColor={'darkgray'}
              onChange={onChange}
            />
          </KeyboardAwareScrollView>
          {card !== null ? (
            <IconButton
              title={I18n.t('add_payment_method')}
              backgroundColor={colors.p1}
              icon={appIcons.plusIcon}
              iconColor={colors.white}
              style={styles.loginButton}
              titleColor={colors.white}
              onSubmit={addCardWithStripe}
              loaderColor={colors.white}
              isLoading={loading}
            />
          ) : null}
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default AddPayment;
