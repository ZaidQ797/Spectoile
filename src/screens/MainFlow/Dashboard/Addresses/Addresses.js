/* eslint-disable react-hooks/exhaustive-deps */
import React, {Fragment, useState, useEffect} from 'react';
import {Text, View, SafeAreaView, ActivityIndicator} from 'react-native';
import {TitleHeader, BillingAddCard} from '../../../../components';
import I18n from '../../../../translation';
import {ButtonGroup} from 'react-native-elements';
import {colors} from '../../../../utilities';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getAddresses} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const Addresses = ({navigation, route}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const isFocusd = useIsFocused();

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.login);

  useEffect(() => {
    if (isFocusd) {
      onGetAddresses();
    }
  }, [isFocusd]);

  const onGetAddresses = () => {
    setLoading(true);
    const cbSuccess = (res) => {
      setLoading(false);
    };
    const cbFailure = () => {
      setLoading(false);
    };
    dispatch(getAddresses({}, token, cbSuccess, cbFailure));
  };

  //const buttons = [I18n.t('billing'), I18n.t('shipping')];
  const buttons = [I18n.t('billing')];

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.goBack()}
          title={route?.params?.item?.label}
        />
        <View style={styles.body}>
          <View style={styles.spacer} />
          {/* <ButtonGroup
            onPress={setSelectedIndex}
            selectedIndex={selectedIndex}
            selectedButtonStyle={styles.btn}
            buttonStyle={styles.btnUnslected}
            buttons={buttons}
            textStyle={styles.unselectedText}
            selectedTextStyle={styles.selectedText}
            containerStyle={[styles.buttonContainer]}
          /> */}
          <Text style={styles.profileQoute}>{I18n.t('address_qoute')}</Text>
          <View style={styles.spacer} />
          {loading && (
            <View style={styles.centerView}>
              <ActivityIndicator size={'large'} animating color={colors.p1} />
            </View>
          )}
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            {selectedIndex === 0 ? (
              <BillingAddCard
                title={I18n.t('billing_address')}
                type={'Billing'}
              />
            ) : (
              <BillingAddCard
                title={I18n.t('dilevery_address')}
                type={'Shipping'}
              />
            )}
          </KeyboardAwareScrollView>
          <View style={styles.spacer} />
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default Addresses;
