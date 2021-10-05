import React, {useState, Fragment} from 'react';
import {View, SafeAreaView, ScrollView, Text, FlatList} from 'react-native';
import styles from './styles';
import {TitleHeader, RefralCard} from '../../../../components';
import I18n from '../../../../translation';
import {appIcons, appImages, colors} from '../../../../utilities';

const MyReferrals = ({navigation, route}) => {
  const [data, setData] = useState([
    {
      label: 'Alimentarium',
      image: appImages.refralImage,
    },
    {
      label: 'Alimentarium',
      image: appImages.refralImage,
    },
    {
      label: 'Alimentarium',
      image: appImages.refralImage,
    },
  ]);

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
            <Text style={styles.qoute}>{I18n.t('referral_qoute')}</Text>
            <FlatList
              data={data}
              contentContainerStyle={styles.flatListStyle}
              renderItem={({item, index}) => (
                <RefralCard
                  index={index}
                  item={item}
                  lastItem={(item = index === data.length - 1 ? true : false)}
                />
              )}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.bgLightColor}} />
    </Fragment>
  );
};

export default MyReferrals;
