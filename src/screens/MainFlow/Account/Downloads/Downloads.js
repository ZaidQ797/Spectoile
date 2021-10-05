import React, {Fragment} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import styles from './styles';
import {TitleHeader, AddPaymentCard} from '../../../../components';
import I18n from '../../../../translation';
import {colors} from '../../../../utilities';

const Downloads = ({navigation, route}) => {
  return (
    <Fragment>
      <SafeAreaView style={styles.main}>
        <TitleHeader
          onLeftPress={() => navigation.pop()}
          title={route?.params?.item?.label}
        />
        <View style={styles.body}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.spacer} />
            <AddPaymentCard
              title={I18n.t('no_downloads')}
              btnType={'download'}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default Downloads;
