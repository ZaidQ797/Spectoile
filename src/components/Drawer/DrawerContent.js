import React, {useState} from 'react';
import {View} from 'react-native';
import {appIcons, colors} from '../../utilities';
import {ProfileHeader, Loader} from '../../components';
import I18n from '../../translation';
import {Icon} from 'react-native-elements';

import {styles} from './styles';
import {MenuCard} from '../../components';

import {CommonActions} from '@react-navigation/routers';
import Snackbar from 'react-native-snackbar';
import {useNetInfo} from '@react-native-community/netinfo';

import {logoutRequest} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';

const DrawerComponent = ({navigation}) => {
  const [loading, setLaoding] = useState(false);

  const netInfo = useNetInfo();

  const options = [
    {
      icon: appIcons.homeIcon,
      label: I18n.t('home'),
      tag: '',
      onPress: () => {
        navigation.navigate('App', {
          screen: 'Home',
        });
      },
    },
    {
      icon: appIcons.accountIcon,
      label: I18n.t('account'),
      tag: '',
      onPress: () => {
        navigation.navigate('AccountFlow', {
          screen: 'Dashboard',
        });
      },
    },
    {
      icon: appIcons.dashboardIcon,
      label: I18n.t('dashboard'),
      tag: '',
      onPress: () => {
        navigation.navigate('DashboardFlow');
      },
    },
    {
      icon: appIcons.buyPackIcon,
      label: I18n.t('buy_the_package'),
      tag: '',
      onPress: () => {
        navigation.navigate('AddListingFlow', {
          screen: 'Packages',
        });
      },
    },
    {
      icon: appIcons.logoutIcon,
      label: I18n.t('logout'),
      tag: '',
      onPress: () => {
        onLogout();
      },
    },
  ];

  const dispatch = useDispatch();
  const {token, authType} = useSelector((state) => state.login);

  const onLogout = () => {
    if (!netInfo.isConnected) {
      Snackbar.show({
        text: I18n.t('no_internet_conn'),
        backgroundColor: colors.snackRed,
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
    setLaoding(true);
    const cbSuccess = (data) => {
      if (authType === 'facebook') {
        LoginManager.logOut();
      } else if (authType === 'google') {
        GoogleSignin.signOut();
      }
      setLaoding(false);
      console.log('from cb success ', data);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        }),
      );
    };
    const cbFailure = (error) => {
      console.log(error);
      setLaoding(false);
      Snackbar.show({
        text: error,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.snackRed,
        action: {
          text: 'Refresh token',
          textColor: 'white',
          onPress: () => {
            /* Do something. */
          },
        },
      });
    };
    dispatch(logoutRequest({token}, cbSuccess, cbFailure));
  };

  return (
    <View style={styles.drawerContainer}>
      <ProfileHeader navigation={navigation} />
      <View style={styles.spacer} />
      {options.map((item, index) => {
        return (
          <MenuCard
            index={index}
            title={item.label}
            icon={item.icon}
            backgroundColor={colors.drawerBgColor}
            onPress={item.onPress}
            labelColor={colors.white}
          />
        );
      })}
      <Loader loading={loading} />
    </View>
  );
};

export {DrawerComponent};
