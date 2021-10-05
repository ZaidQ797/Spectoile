/* eslint-disable quotes */
import React, {useState, useRef, useEffect} from 'react';
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
  loginValidation,
  googleSignInConfig,
} from '../../../utilities';
import Snackbar from 'react-native-snackbar';
import {Input, IconButton, Loader} from '../../../components';
import {CommonActions} from '@react-navigation/routers';
import I18n from '../../../translation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  loginRequest,
  socialAuthRequest,
  updateAuthType,
} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {
  appleAuth,
  AppleAuthError,
} from '@invertase/react-native-apple-authentication';

const Login = ({navigation}) => {
  let emailRef = useRef(null);
  let passRef = useRef(null);

  const netInfo = useNetInfo();

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  //facebook
  const [fbUser, setFBUser] = useState(null);
  const [fbtoken, setFbtoken] = useState(null);
  //Google
  const [inProgress, setProgress] = useState(false);
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('admin');
  // const [password, setPassword] = useState('pass1234');

  const dispatch = useDispatch();
  const {appleUser, appleAlreadyLogin} = useSelector((state) => state.login);
  const {initialScreen} = useSelector((state) => state.drawer);

  useEffect(() => {
    GoogleSignin.configure(googleSignInConfig);
  }, []);

  //call social auth api with apple
  useEffect(() => {}, [appleUser]);

  //Login with Email & Password
  const onLogin = () => {
    if (!netInfo.isConnected) {
      Snackbar.show({
        text: I18n.t('no_internet_conn'),
        backgroundColor: colors.snackRed,
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    let res = loginValidation(email, password);
    if (res.success) {
      setLoading(true);
      const cbSuccess = (data) => {
        dispatch(updateAuthType('email'));
        Snackbar.show({
          text: 'Connexion réussie',
          backgroundColor: colors.snackGreen,
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'App'}],
          }),
        );
        setLoading(false);
      };
      const cbFailure = (error) => {
        setLoading(false);
        Snackbar.show({
          text: error || 'Échec de la connexion. Veuillez réessayer',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.snackRed,
        });
      };

      let data = {
        username: email,
        password,
      };

      dispatch(loginRequest(data, cbSuccess, cbFailure, checked));
    } else {
      Snackbar.show({
        text: res.message,
        backgroundColor: colors.snackRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  //Login with Facebook
  const loginWithFacebook = async () => {
    try {
      if (!netInfo.isConnected) {
        Snackbar.show({
          text: I18n.t('no_internet_conn'),
          backgroundColor: colors.snackRed,
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }
      const result = await LoginManager.logInWithPermissions([
        'public_profile,email',
      ]);
      if (result.isCancelled) {
        Snackbar.show({
          // eslint-disable-next-line quotes
          text: `Connexion annulée par l'utilisateur.`,
          backgroundColor: colors.snackRed,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        setFbtoken(data.token);
        makeGraphReq(data);
      }
    } catch (err) {
      Snackbar.show({
        text: err,
        backgroundColor: colors.snackRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const makeGraphReq = (data) => {
    const profileRequestConfig = {
      httpMethod: 'GET',
      version: 'v2.5',
      parameters: {
        fields: {
          string: 'id, name,picture,email,friends',
        },
      },
      accessToken: data.token,
    };
    const infoRequest = new GraphRequest(
      '/me',
      profileRequestConfig,
      responseInfoCallback,
    );
    //Start the request
    new GraphRequestManager().addRequest(infoRequest).start();
  };

  //Create facebook response callback.
  const responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      setLoading(true);
      console.log('Facebook user info ==========', result);
      //Call api to authenticate user with facebook
      let cbSuccess = (response) => {
        dispatch(updateAuthType('facebook'));
        console.log('Response', response);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'App'}],
          }),
        );
        Snackbar.show({
          text: 'Connexion réussie',
          backgroundColor: colors.snackGreen,
          duration: Snackbar.LENGTH_SHORT,
        });
        setFBUser(result);
        setLoading(false);
      };
      let cbFailure = (error) => {
        Snackbar.show({
          text: error || 'Échec de la connexion. Veuillez réessayer',
          backgroundColor: colors.snackRed,
          duration: Snackbar.LENGTH_SHORT,
        });
        setLoading(false);
      };

      let fbData = new FormData();
      fbData.append('network', 'facebook');
      fbData.append('email', result.email);
      fbData.append('id', result.id + result.name);
      fbData.append('name', result.name);
      fbData.append('password', result.id + result.name);

      dispatch(
        socialAuthRequest(fbData, cbSuccess, cbFailure, 'facebook', true),
      );
    }
  };

  const loginWithGoogle = async () => {
    try {
      //Start Google login
      setProgress(true);
      if (!netInfo.isConnected) {
        Snackbar.show({
          text: I18n.t('no_internet_conn'),
          backgroundColor: colors.snackRed,
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUser(userInfo?.user);
      console.log(userInfo?.user);
      setLoading(true);

      // Call api to authenticate user with google
      let cbSuccess = (response) => {
        dispatch(updateAuthType('google'));
        setLoading(false);
        console.log('Response', response);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'App'}],
          }),
        );
        Snackbar.show({
          text: 'Connexion réussie',
          backgroundColor: colors.snackGreen,
          duration: Snackbar.LENGTH_SHORT,
        });
        setLoading(false);
      };
      let cbFailure = (error) => {
        setLoading(false);
        Snackbar.show({
          text: error || 'Échec de la connexion. Veuillez réessayer',
          backgroundColor: colors.snackRed,
          duration: Snackbar.LENGTH_SHORT,
        });
      };

      let fbData = new FormData();
      fbData.append('network', 'google');
      fbData.append('email', userInfo.user.email);
      // fbData.append('id', userInfo.user.id);
      fbData.append('name', userInfo.user.name);
      fbData.append('password', userInfo.user.id);

      dispatch(socialAuthRequest(fbData, cbSuccess, cbFailure, 'google', true));
    } catch (err) {
      console.log(err.message);
      Snackbar.show({
        text: `Connexion annulée par l'utilisateur.`,
        backgroundColor: colors.snackRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const loginWithApple = async () => {
    try {
      if (!netInfo.isConnected) {
        Snackbar.show({
          text: I18n.t('no_internet_conn'),
          backgroundColor: colors.snackRed,
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        let appleData = new FormData();
        appleData.append('network', 'apple');
        appleData.append(
          'email',
          appleAuthRequestResponse.email === null
            ? ''
            : appleAuthRequestResponse.email,
        );
        appleData.append('identityToken', appleAuthRequestResponse.user);
        if (email !== null) {
          appleData.append(
            'name',
            appleAuthRequestResponse.fullName.givenName +
              appleAuthRequestResponse.fullName.familyName,
          );
          appleData.append(
            'id',
            email + appleAuthRequestResponse.fullName.givenName,
          );
          appleData.append(
            'password',
            email + appleAuthRequestResponse.fullName.familyName,
          );
        } else {
          appleData.append('name', null);
          appleData.append('id', null);
          appleData.append('password', null);
        }
        callAppleAuthApi(appleData);
      } else {
        Snackbar.show({
          text: `Connexion annulée par l'utilisateur.`,
          backgroundColor: colors.snackRed,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (err) {
      console.log('err', err);
      if (err.code === AppleAuthError.CANCELED) {
        Snackbar.show({
          text: `Connexion annulée par l'utilisateur.`,
          backgroundColor: colors.snackRed,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        // other unknown error
      }
    }
  };

  const callAppleAuthApi = (params) => {
    console.log(params);
    console.log('callAppleAuthApi');
    setLoading(true);
    let cbSuccess = (response) => {
      dispatch(updateAuthType('apple'));
      setLoading(false);
      //console.log('Response', response);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'App'}],
        }),
      );
      Snackbar.show({
        text: 'Connexion réussie',
        backgroundColor: colors.snackGreen,
        duration: Snackbar.LENGTH_SHORT,
      });
    };
    let cbFailure = (error) => {
      setLoading(false);
      Snackbar.show({
        text: error || 'Échec de la connexion. Veuillez réessayer',
        backgroundColor: colors.snackRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    };
    dispatch(socialAuthRequest(params, cbSuccess, cbFailure, 'apple', true));
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
        <Text style={styles.title}>{I18n.t('login')}</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder={I18n.t('username')}
            placeholderTextColor={colors.black}
            value={email}
            onChangeText={(text) => setEmail(text)}
            leftIcon={
              <Image
                resizeMode={'contain'}
                source={appIcons.userIcon}
                style={styles.userIcon}
              />
            }
            reference={emailRef}
            onSubmitEditing={() => passRef.current.focus()}
            returnKeyType={'next'}
          />

          <Input
            placeholder={I18n.t('password')}
            style={{marginTop: HP(2)}}
            placeholderTextColor={colors.black}
            value={password}
            onChangeText={(text) => setPassword(text)}
            leftIcon={
              <Image
                resizeMode={'contain'}
                source={appIcons.lockIcon}
                style={styles.userIcon}
              />
            }
            secureTextEntry
            reference={passRef}
            returnKeyType={'default'}
          />
        </View>
        <View style={styles.forgotContainer}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              checked={checked}
              onPress={() => setChecked(!checked)}
              checkedColor={colors.p1}
              containerStyle={styles.checkBox}
            />
            <Text style={styles.smallText}>{I18n.t('keep_me_logged')}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.smallText}>{I18n.t('forgot_passord')}</Text>
          </TouchableOpacity>
        </View>
        <IconButton
          title={I18n.t('login')}
          backgroundColor={colors.p1}
          icon={appIcons.loginIcon}
          iconColor={colors.white}
          style={styles.loginButton}
          titleColor={colors.white}
          onSubmit={onLogin}
        />
        <Text style={styles.smallText}>
          {I18n.t('not_a_member_yet')}{' '}
          <Text
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={[
              styles.smallText,
              {color: colors.p1, fontSize: size.xtiny},
            ]}>
            {I18n.t('register_here')}
          </Text>
        </Text>
        <IconButton
          title={I18n.t('sign_in_apple')}
          backgroundColor={colors.white}
          icon={appIcons.appleIcon}
          onSubmit={loginWithApple}
          iconColor={colors.black}
          titleColor={colors.black}
          style={styles.loginButton}
        />
        {/* <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: '88%', // You must specify a width
            height: 45, // You must specify a height
            alignSelf: 'center',
            marginVertical: HP('2'),
            borderColor: colors.border,
            borderWidth: 1,
          }}
          onPress={() => loginWithApple()}
        /> */}
        <View
          style={[
            styles.loginButton,
            {
              backgroundColor: colors.white,
              marginVertical: HP(0),
            },
          ]}>
          <Text
            style={[
              styles.smallText,
              {
                fontSize: size.xxsmall,
                paddingHorizontal: WP(10),
                paddingVertical: HP(3),
                fontFamily: family.Montserrat_Medium,
              },
            ]}>
            {I18n.t('social_message')}{' '}
          </Text>
          <View style={styles.row}>
            <SocialIcon
              title={'Facebook'}
              type={'facebook'}
              iconSize={18}
              button
              style={styles.socialButton}
              fontFamily={family.Montserrat_Medium}
              onPress={loginWithFacebook}
            />
            <SocialIcon
              type={'google'}
              fontFamily={family.Montserrat_Medium}
              iconSize={18}
              title={'Google'}
              button
              style={styles.socialButton}
              onPress={loginWithGoogle}
            />
          </View>
        </View>
        <View style={{marginVertical: HP(2)}} />
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </SafeAreaView>
  );
};

export default Login;
