import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {
  captachaBaseUrl,
  captchaSiteKey,
  appIcons,
  WP,
  colors,
  family,
  HP,
  size,
} from '../../utilities';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import I18n from '../../translation';

const GoogleCaptcha = ({onCaptchaComplete}) => {
  let captchaRef = useRef();

  const [verified, setVerified] = useState(false);

  useEffect(() => {}, [verified]);

  //On captcha confirm
  const onMessage = (event) => {
    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        setVerified(false);
        onCaptchaComplete('Error');
        captchaRef.current.hide();
        return;
      } else {
        console.log('Verified code from Google', event.nativeEvent.data);
        setTimeout(() => {
          setVerified(true);
          onCaptchaComplete('Complete');
          captchaRef.current.hide();
          // do what ever you want here
        }, 1000);
      }
    }
  };

  return (
    <View>
      <Text numberOfLines={2} style={[styles.captchaText]}>
        {I18n.t('captcha_ver')}
      </Text>
      <ConfirmGoogleCaptcha
        ref={captchaRef}
        siteKey={captchaSiteKey}
        baseUrl={captachaBaseUrl}
        languageCode="fr"
        onMessage={(event) => onMessage(event)}
        cancelButtonText={'Annuler'}
      />
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
          <Text
            numberOfLines={2}
            style={[
              styles.loginText,
              {
                marginTop: WP('3'),
                color: colors.p2,
                fontFamily: family.Montserrat_Bold,
              },
            ]}>
            {I18n.t('confirm')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  captchaText: {
    fontSize: size.xsmall,
    fontFamily: family.Montserrat_Bold,
    textAlign: 'left',
  },
  confirmedIcon: {
    width: WP('9'),
    height: HP('4'),
    marginTop: HP('1'),
  },
});
export {GoogleCaptcha};
