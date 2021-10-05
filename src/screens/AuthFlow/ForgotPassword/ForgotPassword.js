import React, {useState, useRef} from 'react';
import {Text, View, Image, SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';
import {CheckBox, SocialIcon} from 'react-native-elements';
import {
  appIcons,
  colors,
  family,
  HP,
  size,
  WP,
  captachaBaseUrl,
  captchaSiteKey,
} from '../../../utilities';
import {Input, IconButton, Loader} from '../../../components';
import I18n from '../../../translation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CommonActions} from '@react-navigation/routers';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPassword} from '../../../redux/actions';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import {useNetInfo} from '@react-native-community/netinfo';

const ForgotPassword = ({navigation}) => {
  let captchaRef = useRef();

  const netInfo = useNetInfo();

  //local util
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  //local states
  const [usernameOrEmail, setUserNameEmail] = useState('');

  //redux
  const dispatch = useDispatch();
  const {} = useSelector((state) => state);

  //send reset pass link on username or email
  const onForgotPass = () => {
    if (!netInfo.isConnected) {
      Snackbar.show({
        text: I18n.t('no_internet_conn'),
        backgroundColor: colors.snackRed,
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    if (usernameOrEmail !== '') {
      if (!verified) {
        alert('Please confirm your identity to proceed');
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append('username', usernameOrEmail);

      const cbSuccess = (res) => {
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
        Snackbar.show({
          text: res?.message,
          backgroundColor: colors.snackGreen,
          duration: Snackbar.LENGTH_LONG,
        });
      };
      const cbFailure = (error) => {
        setLoading(false);
        Snackbar.show({
          text: error || 'Oops, Server error. Try again',
          backgroundColor: colors.snackRed,
          duration: Snackbar.LENGTH_SHORT,
        });
      };

      dispatch(forgotPassword(formData, cbSuccess, cbFailure));
    } else {
      Snackbar.show({
        text: I18n.t('enter_all_fields'),
        backgroundColor: colors.snackRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  //On captcha confirm
  const onMessage = (event) => {
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        setVerified(false);
        captchaRef.current.hide();
        return;
      } else {
        console.log('Verified code from Google', event.nativeEvent.data);
        setTimeout(() => {
          captchaRef.current.hide();
          setVerified(true);
          // do what ever you want here
        }, 1500);
      }
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle={'dark-content'} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingBottom: HP(5)}}>
        <View style={styles.logoContainer}>
          <Image
            source={appIcons.appLogo}
            resizeMode={'contain'}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>{I18n.t('forgot_password_title')}</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder={I18n.t('username_or_email')}
            placeholderTextColor={colors.black}
            onChangeText={(text) => setUserNameEmail(text)}
            leftIcon={
              <Image
                resizeMode={'contain'}
                source={appIcons.userIcon}
                style={styles.userIcon}
              />
            }
            value={usernameOrEmail}
          />
          <Text numberOfLines={2} style={[styles.captchaText]}>
            {I18n.t('captcha_ver')}
          </Text>
          {/* <Image
            source={appImages.captachaImage}
            style={styles.captachaImage}
          /> */}
          <TouchableOpacity
            onPress={() => {
              if (!verified) {
                captchaRef.current.show();
              }
            }}>
            {verified ? (
              <Image
                source={appIcons.confirmedIcon}
                style={styles.confirmedIcon}
                resizeMode={'contain'}
              />
            ) : (
              <Text numberOfLines={2} style={[styles.confirmText]}>
                {I18n.t('confirm')}
              </Text>
            )}
          </TouchableOpacity>

          {/* <Input
            placeholder={I18n.t('enter_above_text')}
            style={{marginTop: HP(2)}}
            placeholderTextColor={colors.black}
            onChangeText={(text) => console.log(text)}
            leftIcon={
              <Image
                resizeMode={'contain'}
                source={appIcons.lockIcon}
                style={styles.userIcon}
              />
            }
            secureTextEntry
          /> */}
        </View>
        <IconButton
          title={I18n.t('generate_password')}
          backgroundColor={colors.p1}
          icon={appIcons.loginIcon}
          iconColor={colors.white}
          style={styles.loginButton}
          titleColor={colors.white}
          onSubmit={onForgotPass}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={[
              styles.smallText,
              {color: colors.p1, fontSize: size.xtiny},
            ]}>
            {I18n.t('back_to_login')}
          </Text>
        </TouchableOpacity>
        <ConfirmGoogleCaptcha
          ref={captchaRef}
          siteKey={captchaSiteKey}
          baseUrl={captachaBaseUrl}
          languageCode="fr"
          onMessage={(event) => onMessage(event)}
        />
        <View style={{marginVertical: HP(2)}} />
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </SafeAreaView>
  );
};

export default ForgotPassword;
