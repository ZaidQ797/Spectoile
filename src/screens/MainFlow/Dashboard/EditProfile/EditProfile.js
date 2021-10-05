import React, {Fragment, useState, useEffect} from 'react';
import {Text, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {
  TitleHeader,
  Input,
  IconButton,
  PickImagePopup,
  Loader,
} from '../../../../components';
import I18n from '../../../../translation';
import {appIcons, appImages, colors} from '../../../../utilities';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import {getProfileRequest, editProfileRequest} from '../../../../redux/actions';

const EditProfile = ({navigation, route}) => {
  //Local States
  const [uri, setUri] = useState('');
  const [imageRes, setImageRes] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [site, setSite] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [desc, setDesc] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLaoding] = useState(false);
  const [profileRes, setProfileRes] = useState(null);

  //redux
  const dispatch = useDispatch();
  const {token, authType} = useSelector((state) => state.login);

  useEffect(() => {
    onGetProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetProfile = (type = 'first') => {
    if (type !== 'second') setLaoding(true);
    const cbSuccess = (res) => {
      setLaoding(false);
      setProfileRes(res);
    };
    const cbFailure = (_err) => {
      setLaoding(false);
    };
    dispatch(getProfileRequest({}, token, cbSuccess, cbFailure));
  };

  useEffect(() => {
    if (profileRes) {
      setFirstName(
        profileRes.user_first_name[0] === ''
          ? profileRes?.display_name
          : profileRes.user_first_name[0],
      );
      setLastName(
        profileRes.user_last_name[0] === ''
          ? profileRes?.user_nicename
          : profileRes.user_last_name[0],
      );
      setEmail(profileRes.user_email);
      setSite(profileRes.user_url);
      setDesc(profileRes.description[0]);
    }
  }, [profileRes]);

  const onCameraPress = () => {
    try {
      var options = {
        title: 'Select Image',
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose file from Custom Option',
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.launchCamera(options, (res) => {
        console.log('Response = ', res);

        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          setShowPopup(!showPopup);
          // const imageName = res.uri.substr(str.lastIndexOf('/') + 1);
          setUri(res.uri);
          setImageRes(res);
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  const onPhotoPress = () => {
    try {
      var options = {
        title: 'Select Image',
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose file from Custom Option',
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.launchImageLibrary(options, (res) => {
        console.log('Response = ', res);
        setShowPopup(false);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          // const imageName = res.uri.substr(str.lastIndexOf('/') + 1);
          setUri(res.uri);
          setImageRes(res);
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  const onEditProfile = () => {
    if (authType === 'email') {
      if (password !== confirmPass || password === '' || confirmPass === '') {
        //eslint-disable-next-line no-alert
        alert(I18n.t('pass_dont_match'));
        return;
      }
    }
    setLaoding(true);
    let params = new FormData();
    params.append('first_name', firstName);
    params.append('last_name', lastName);
    params.append('email', email);
    params.append('url', site);
    params.append('description', desc);
    params.append('password', password);
    params.append('password2', confirmPass);

    const cbSuccess = () => {
      setLaoding(false);
      setPassword('');
      setConfirmPass('');
      setTimeout(() => {
        // eslint-disable-next-line no-alert
        alert(I18n.t('profile_updated_success'));
      }, 300);
      onGetProfile('second');
    };
    const cbFailure = (_err) => {
      setLaoding(false);
    };
    dispatch(editProfileRequest(params, token, cbSuccess, cbFailure));
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.goBack()}
          title={route?.params?.item?.label}
        />
        <View style={styles.body}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}>
            <Text style={styles.profileQoute}>
              {I18n.t('edit_profile_qoute')}
            </Text>
            <View style={styles.spacer} />
            {/* <TouchableOpacity
              onPress={() => setShowPopup(!showPopup)}
              style={styles.picBG}>
              <Image
                source={uri === '' ? appImages.homeBanner : {uri: uri}}
                resizeMode={'cover'}
                style={styles.userImage}
              />
            </TouchableOpacity> */}
            <View style={styles.spacer} />
            <Input
              placeholder={I18n.t('first_name')}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              leftIcon={
                <Image
                  resizeMode={'contain'}
                  source={appIcons.userIcon}
                  style={styles.userIcon}
                />
              }
            />
            <Input
              placeholder={I18n.t('last_name')}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              leftIcon={
                <Image
                  resizeMode={'contain'}
                  source={appIcons.userIcon}
                  style={styles.userIcon}
                />
              }
            />
            <Input
              placeholder={I18n.t('email')}
              value={email}
              onChangeText={(text) => setEmail(text)}
              leftIcon={
                <Image
                  resizeMode={'contain'}
                  source={appIcons.mailIcon}
                  style={styles.userIcon}
                />
              }
            />
            <Input
              placeholder={'Site Web'}
              value={site}
              onChangeText={(text) => setSite(text)}
              leftIcon={
                <Image
                  resizeMode={'contain'}
                  source={appIcons.globeIcon}
                  style={styles.userIcon}
                />
              }
            />
            {authType === 'email' ? (
              <Fragment>
                <Input
                  placeholder={I18n.t('password')}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholderTextColor={colors.black}
                  leftIcon={
                    <Image
                      resizeMode={'contain'}
                      source={appIcons.lockIcon}
                      style={styles.userIcon}
                    />
                  }
                  secureTextEntry
                />
                <Input
                  placeholder={I18n.t('repeat_password')}
                  value={confirmPass}
                  onChangeText={(text) => setConfirmPass(text)}
                  placeholderTextColor={colors.black}
                  leftIcon={
                    <Image
                      resizeMode={'contain'}
                      source={appIcons.lockIcon}
                      style={styles.userIcon}
                    />
                  }
                  secureTextEntry
                />
              </Fragment>
            ) : null}

            <Input
              placeholder={I18n.t('description')}
              value={desc}
              onChangeText={(text) => setDesc(text)}
              placeholderTextColor={colors.black}
              leftIcon={
                <Image
                  resizeMode={'contain'}
                  source={appIcons.desc_icon}
                  style={styles.userIcon}
                />
              }
              multiline
              onlyInput={false}
            />
            <View style={styles.spacer} />
            <IconButton
              title={I18n.t('update_profile')}
              backgroundColor={colors.p1}
              icon={appIcons.uploadIcon}
              iconColor={colors.white}
              titleColor={colors.white}
              style={styles.loginButton}
              onSubmit={onEditProfile}
            />
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
      <PickImagePopup
        isVisible={showPopup}
        onCancel={() => setShowPopup(!showPopup)}
        onCameraPress={() => {
          setShowPopup(false);
          setTimeout(() => {
            onCameraPress();
          }, 500);
        }}
        onPhotoPress={() => {
          setShowPopup(false);
          setTimeout(() => {
            onPhotoPress();
          }, 500);
        }}
      />
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
      <Loader loading={loading} />
    </Fragment>
  );
};

export default EditProfile;
