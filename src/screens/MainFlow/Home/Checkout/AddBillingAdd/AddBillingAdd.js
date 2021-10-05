import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BillingForm, SingleHeader} from '../../../../../components';
import styles from './styles';

const AddBillingAdd = ({navigation, route}) => {
  const [screenType, setScreenType] = useState(route?.params?.type);

  return (
    <SafeAreaView style={styles.main}>
      <SingleHeader
        onLeftPress={() => {
          navigation.pop();
        }}
      />
      <View style={styles.body}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <BillingForm type={screenType} />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddBillingAdd;
