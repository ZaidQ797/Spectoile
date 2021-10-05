import React, {useEffect, Fragment} from 'react';
import {Image, ImageBackground, StatusBar} from 'react-native';
import styles from './styles';
import {appImages, appIcons} from '../../utilities';
import {useNetInfo} from '@react-native-community/netinfo';
import {validateToken} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const Splash = ({navigation}) => {
  const netInfo = useNetInfo();

  const dispatch = useDispatch();
  const {token, isLoggedIn} = useSelector((state) => state.login);

  useEffect(() => {
    onValidateToken();
  });

  const moveUser = (isMove) => {
    setTimeout(() => {
      if (isMove) {
        console.log('Move to App');
        navigation.navigate('App');
      } else {
        console.log('Move to Auth');
        navigation.navigate('Auth');
      }
    }, 2000);
  };

  //Validate token eighter it has been expired or valid
  const onValidateToken = () => {
    if (!netInfo.isConnected) {
      moveUser(isLoggedIn);
      return;
    }
    const cbSuccess = (data) => {
      if (data.data.status === 200) {
        console.log('from cb success ', data);
        moveUser(true);
      } else {
        moveUser(false);
      }
    };
    const cbFailure = (error) => {
      moveUser(false);
      console.log('from cb error ', error);
      console.log(error);
    };
    if (isLoggedIn && token !== '') {
      dispatch(validateToken({token}, cbSuccess, cbFailure));
    } else {
      moveUser(false);
    }
  };

  return (
    <Fragment>
      <StatusBar hidden />
      <ImageBackground style={styles.background} source={appImages.splashBack}>
        <Image
          source={appIcons.appLogo}
          resizeMode={'contain'}
          style={styles.logo}
        />
      </ImageBackground>
    </Fragment>
  );
};

export default Splash;
