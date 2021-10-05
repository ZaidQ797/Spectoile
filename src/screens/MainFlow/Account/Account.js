import React, {Fragment} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import styles from './styles';
import {TitleHeader, MenuCard} from '../../../components';
import I18n from '../../../translation';
import {appIcons, colors} from '../../../utilities';

const Account = ({navigation}) => {
  const menuOptions = [
    {
      icon: appIcons.addListingIcon,
      label: I18n.t('add_listing'),
      tag: '',
      onPress: (item) => {
        navigation.navigate('AddMyListing', {
          item,
        });
      },
    },
    // {
    //   icon: appIcons.downloadIcon,
    //   label: I18n.t('downloads'),
    //   tag: '',
    //   onPress: (item) => {
    //     navigation.navigate('Downloads', {
    //       item,
    //     });
    //   },
    // },
    {
      icon: appIcons.buyPackIcon,
      label: I18n.t('my_packs'),
      tag: '',
      onPress: (item) => {
        navigation.navigate('MyPackages', {
          item,
        });
      },
    },
    // {
    //   icon: appIcons.refrralIcon,
    //   label: I18n.t('my_refrels'),
    //   tag: '',
    //   onPress: (item) => {
    //     navigation.navigate('MyReferrals', {
    //       item,
    //     });
    //   },
    // },
    {
      icon: appIcons.myListingIcon,
      label: I18n.t('my_list'),
      tag: '',
      onPress: (item) => {
        navigation.navigate('MyListing', {
          item,
        });
      },
    },
    {
      icon: appIcons.researchIcon,
      label: I18n.t('my_reasearch'),
      tag: '',
      onPress: (item) => {
        navigation.navigate('MyReaserch', {
          item,
        });
      },
    },
    {
      icon: appIcons.reportedIcon,
      label: I18n.t('reported'),
      tag: '',
      onPress: (item) => {
        navigation.navigate('Reported', {
          item,
        });
      },
    },
    {
      icon: appIcons.claimIcon,
      label: I18n.t('claims'),
      tag: '',
      onPress: (item) => {
        navigation.navigate('Claims', {
          item,
        });
      },
    },
  ];

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.navigate('App')}
          // title={I18n.t('account')}
          title={I18n.t('dashboard')}
        />
        <View style={styles.body}>
          <ScrollView contentContainerStyle={styles.scrollView}>
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
          </ScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default Account;
