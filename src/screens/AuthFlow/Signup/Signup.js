import React, {useState, useRef} from 'react';
import {Text, View, Image, SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';
import {Icon, CheckBox} from 'react-native-elements';
import {appIcons, colors, HP, size, signUpValdation} from '../../../utilities';
import {Input, IconButton, Loader} from '../../../components';
import I18n from '../../../translation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonActions} from '@react-navigation/routers';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {signUpAction} from '../../../redux/actions';
import {useNetInfo} from '@react-native-community/netinfo';

const Signup = ({navigation}) => {
  //local util
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  let fullNameRef = useRef(null);
  let usernameRef = useRef(null);
  let emailRef = useRef(null);
  let passwordRef = useRef(null);
  let confirmPassRef = useRef(null);

  const netInfo = useNetInfo();

  //local states
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  //redux
  const dispatch = useDispatch();
  const {} = useSelector((state) => state);

  //Register new user
  const onSignup = () => {
    if (!netInfo.isConnected) {
      Snackbar.show({
        text: I18n.t('no_internet_conn'),
        backgroundColor: colors.snackRed,
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    let valRes = signUpValdation(
      fullName,
      username,
      email,
      password,
      confirmPass,
    );
    if (valRes.success) {
      if (!checked) {
        Snackbar.show({
          text: I18n.t('accept_terms'),
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.snackRed,
        });
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append('first_name', fullName);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);

      const cbSuccess = () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
        Snackbar.show({
          text: 'Inscription réussite',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.snackGreen,
        });
        setLoading(false);
      };
      const cbFailure = (error) => {
        setLoading(false);
        Snackbar.show({
          text: error || 'Oups, erreur de serveur. Réessayer',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.snackRed,
        });
      };

      dispatch(signUpAction(formData, cbSuccess, cbFailure));
    } else {
      Snackbar.show({
        text: valRes.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.snackRed,
      });
    }
  };

  //Main render
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
        <Text style={styles.title}>{I18n.t('signup')}</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder={I18n.t('full_name')}
            placeholderTextColor={colors.black}
            leftIcon={
              <Image
                resizeMode={'contain'}
                source={appIcons.userIcon}
                style={styles.userIcon}
              />
            }
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            reference={fullNameRef}
            onSubmitEditing={() => usernameRef.current.focus()}
            returnKeyType={'next'}
          />
          <Input
            placeholder={I18n.t('username')}
            placeholderTextColor={colors.black}
            leftIcon={
              <Image
                resizeMode={'contain'}
                source={appIcons.userIcon}
                style={styles.userIcon}
              />
            }
            value={username}
            onChangeText={(text) => setUsername(text)}
            reference={usernameRef}
            onSubmitEditing={() => emailRef.current.focus()}
            returnKeyType={'next'}
          />
          <Input
            placeholder={I18n.t('email')}
            style={{marginTop: HP(2)}}
            placeholderTextColor={colors.black}
            keyboardType={'email-address'}
            leftIcon={
              <Icon type={'antdesign'} name={'mail'} size={18} color={'grey'} />
            }
            value={email}
            onChangeText={(text) => setEmail(text)}
            reference={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType={'next'}
          />
          <Input
            placeholder={I18n.t('password')}
            style={{marginTop: HP(2)}}
            placeholderTextColor={colors.black}
            leftIcon={
              <Icon type={'feather'} name={'lock'} size={18} color={'grey'} />
            }
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            reference={passwordRef}
            onSubmitEditing={() => confirmPassRef.current.focus()}
            returnKeyType={'next'}
          />
          <Input
            placeholder={I18n.t('repeat_password')}
            style={{marginTop: HP(2)}}
            placeholderTextColor={colors.black}
            leftIcon={
              <Icon type={'feather'} name={'lock'} size={18} color={'grey'} />
            }
            secureTextEntry
            value={confirmPass}
            onChangeText={(text) => setConfirmPass(text)}
            reference={confirmPassRef}
            // onSubmitEditing={() => usernameRef.current.focus()}
            returnKeyType={'default'}
          />
        </View>
        <View style={styles.forgotContainer}>
          <View style={styles.loggedContainer}>
            <CheckBox
              size={HP(3)}
              checked={checked}
              containerStyle={styles.checkBoxContainer}
              onPress={() => setChecked(!checked)}
              checkedColor={colors.p1}
            />
            <Text numberOfLines={2} style={styles.termsText}>
              {I18n.t('terms_text')}
            </Text>
          </View>
        </View>
        <IconButton
          title={I18n.t('signup')}
          backgroundColor={colors.p1}
          icon={appIcons.loginIcon}
          iconColor={colors.white}
          style={styles.loginButton}
          titleColor={colors.white}
          onSubmit={onSignup}
        />
        <Text style={styles.smallText}>
          {I18n.t('already_have_account')}{' '}
          <Text
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={[
              styles.smallText,
              {color: colors.p1, fontSize: size.xtiny},
            ]}>
            {I18n.t('login')}
          </Text>
        </Text>
        <View style={{marginVertical: HP(2)}} />
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </SafeAreaView>
  );
};

export default Signup;
