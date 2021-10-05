import React from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import styles from './styles';
import {appImages, appIcons, colors, HP} from '../../../utilities';
import {IconButton} from '../../../components';
import I18n from '../../../translation';
import {setInitialRoute} from '../../../redux/actions';
import {useDispatch} from 'react-redux';

const CreateAccount = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <ImageBackground style={styles.background} source={appImages.accountBack}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView style={styles.main}>
        <View style={styles.logoContainer}>
          <Image
            source={appIcons.appLogo}
            resizeMode={'contain'}
            style={styles.logo}
          />
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            title={I18n.t('create_account')}
            style={styles.buttonStyle}
            backgroundColor={colors.p1}
            titleColor={colors.white}
            icon={appIcons.usersIcon}
            onSubmit={() => {
              dispatch(setInitialRoute('App'));
              navigation.navigate('Login');
            }}
          />
          <IconButton
            title={I18n.t('add_listing')}
            titleColor={colors.white}
            style={[styles.buttonStyle, {marginVertical: HP(2.5)}]}
            backgroundColor={colors.p2}
            icon={appIcons.plusIcon}
            onSubmit={() => {
              dispatch(setInitialRoute('BuyPackage'));
              setTimeout(() => {
                // navigation.navigate('App');
                navigation.navigate('Auth', {
                  screen: 'AddListing',
                });
              }, 500);
            }}
          />
        </View>
        <SafeAreaView style={styles.bottomSafeArea} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CreateAccount;
