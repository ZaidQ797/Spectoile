import React, {useEffect} from 'react';
import {StatusBar, YellowBox, StyleSheet, Platform} from 'react-native';
import MainNavigation from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store, {persistor} from './src/redux/store';
import I18n from 'react-native-i18n';
import {colors} from './src/utilities';
import stripe from 'tipsi-stripe';
import admob, {MaxAdContentRating} from '@react-native-firebase/admob';

console.disableYellowBox = true;

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

const App = ({params}) => {
  useEffect(() => {
    I18n.locale = 'fr';
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,
        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,
        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        // Request config successfully set!
      });
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      stripe.setOptions({
        publishableKey: 'pk_test_gF6KEPqLdGOc8MDBBf6u6Sqc',
        androidPayMode: 'test', // 'test|production' Android only
      });
    } else {
      stripe.setOptions({
        // publishableKey:
        //   'pk_test_51I5q8FKC0a4nx7gA9E4hx3MnKRhQSnSxA8C1JA0rfq4fiJqV00hkHgFzSXtpvuGMqoV8zkdZBYvhGLpStOLzR2yi00IPzYRxmw',
        publishableKey: 'pk_test_gF6KEPqLdGOc8MDBBf6u6Sqc',
        merchantId: 'merchant.spectetoile.ideessorites',
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={colors.white} />
      <PersistGate persistor={persistor}>
        <MainNavigation />
      </PersistGate>
      {/* <SafeAreaView style={styles.bottomSafeArea} /> */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  bottomSafeArea: {
    backgroundColor: colors.bgLightColor,
  },
});

export default App;

//en-GB
//fr-FR
//Chnage it to french
//I18n.locale = 'en';
// let deviceLanguage = I18n.currentLocale();
// if (deviceLanguage === 'fr-FR') {
//   I18n.locale = 'fr';
// } else {
//   I18n.locale = 'en';
// }
