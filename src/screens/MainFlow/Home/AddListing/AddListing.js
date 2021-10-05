/* eslint-disable no-alert */
import React, {useEffect, useState, Fragment} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import {IconHeader, AddListSlider, IconButton} from '../../../../components';
import {
  appIcons,
  appImages,
  appSliders,
  colors,
  WP,
} from '../../../../utilities';
import styles from './styles';
import I18n from '../../../../translation';
import {useSelector} from 'react-redux';

const AddListing = ({navigation}) => {
  const [slider, setSlider] = useState([
    {
      id: 0,
      label: I18n.t('home_slider_title3'),
      subtitle: I18n.t('home_slider_subtitle3'),
      icon: appSliders.usageSlider3,
      step: '03',
    },
    {
      id: 1,
      label: I18n.t('home_slider_title2'),
      subtitle: I18n.t('home_slider_subtitle2'),
      icon: appSliders.usageSlider2,
      step: '02',
    },
    {
      id: 2,
      label: I18n.t('home_slider_title1'),
      subtitle: I18n.t('home_slider_subtitle1'),
      icon: appSliders.usageSlider1,
      step: '01',
    },
  ]);

  const {isLoggedIn} = useSelector((state) => state.login);

  const showAlert = (message) =>
    Alert.alert(
      'Alerte',
      message,
      [{text: `D'accord`, onPress: () => console.log('OK Pressed')}],
      {cancelable: true},
    );

  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <StatusBar barStyle={'dark-content'} />
        <IconHeader
          onLeftPress={() => {
            if (isLoggedIn) {
            } else {
              showAlert(I18n.t('login_first'));
            }
          }}
          onSearchPress={() => {
            if (isLoggedIn) {
              navigation.navigate('Search');
            } else {
              showAlert(I18n.t('login_first'));
            }
          }}
          onHeartPress={() => {
            if (isLoggedIn) {
              navigation.navigate('Favorites');
            } else {
              showAlert(I18n.t('login_first'));
            }
          }}
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sliderCotainer}>
              <Text style={styles.redText}>{I18n.t('by_the_way')}</Text>
              <Text numberOfLines={2} style={styles.blackText}>
                {I18n.t('add_listing_qoute')}
              </Text>
              <AddListSlider data={slider} />
            </View>
            <ImageBackground
              style={styles.bottomCotainer}
              source={appImages.addListingBG}>
              <View style={styles.bottomInnerContainer}>
                <Text numberOfLines={2} style={styles.simpleBlack}>
                  {I18n.t('joinus_now')}
                </Text>
                <Text style={styles.subtitle}>{I18n.t('click_qoute')}</Text>
                <View
                  style={[
                    styles.row,
                    {
                      marginTop: WP('4'),
                    },
                  ]}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.arrow}
                    source={appIcons.arrowForward}
                  />
                  <Text style={styles.text}>{I18n.t('easy_registration')}</Text>
                </View>
                <View style={styles.row}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.arrow}
                    source={appIcons.arrowForward}
                  />
                  <Text style={styles.text}>{I18n.t('dedicated_support')}</Text>
                </View>
                <View style={styles.spacer} />
                <IconButton
                  title={I18n.t('start')}
                  backgroundColor={colors.p1}
                  icon={appIcons.loginIcon}
                  iconColor={colors.white}
                  titleColor={colors.white}
                  style={styles.loginButton}
                  onSubmit={() => {
                    // navigation.navigate('Packages');
                    navigation.navigate('Auth', {
                      screen: 'Login',
                    });
                  }}
                />
                <View style={styles.spacer} />
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default AddListing;
