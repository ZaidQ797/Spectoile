import React, {Fragment} from 'react';
import {View, SafeAreaView} from 'react-native';
import styles from './styles';
import {TitleHeader, MenuCard} from '../../../components';
import I18n from '../../../translation';
import {appIcons, colors} from '../../../utilities';

const Dashboard = ({navigation}) => {
  const menuOptions = [
    {
      icon: appIcons.profileIcon,
      label: I18n.t('profile'),
      tag: '',
      onPress: (item) => {
        navigation.navigate('Profile', {
          item,
        });
      },
    },
    {
      icon: appIcons.editProfileIcon,
      label: I18n.t('modify_profile'),
      tag: '',
      onPress: (item) => {
        navigation.navigate('EditProfile', {
          item,
        });
      },
    },
    {
      icon: appIcons.orderIcon,
      label: I18n.t('orders'),
      tag: '',
      onPress: (item) => {
        navigation.navigate('Orders', {
          item,
        });
      },
    },
    {
      icon: appIcons.locationPin,
      label: I18n.t('addresses'),
      tag: '',
      onPress: (item) => {
        navigation.navigate('Addresses', {
          item,
        });
      },
    },
    // {
    //   icon: appIcons.addAddressIcon,
    //   label: I18n.t('add_address'),
    //   tag: '',
    //   onPress: (item) => {
    //     navigation.navigate('AddAddress', {
    //       item,
    //     });
    //   },
    // },
    // {
    //   icon: appIcons.meansPaymentIcon,
    //   label: I18n.t('means_of_payment'),
    //   tag: '',
    //   onPress: (item) => {
    //     navigation.navigate('PaymentMeans', {
    //       item,
    //     });
    //   },
    // },
  ];

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.navigate('App')}
          title={I18n.t('account')}
        />
        <View style={styles.body}>
          <View style={styles.spacer} />
          {menuOptions.map((item, key) => {
            return (
              <MenuCard
                title={item.label}
                icon={item.icon}
                onPress={item.onPress}
                isBorder
                item={item}
              />
            );
          })}
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default Dashboard;
