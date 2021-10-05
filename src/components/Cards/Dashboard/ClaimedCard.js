import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import {HP, colors, WP, family, size} from '../../../utilities';
import I18n from '../../../translation';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import HTML from 'react-native-render-html';

const ClaimedCard = ({item, index}) => {
  let navigation = useNavigation();
  return (
    <View key={index} style={styles.priceContainer}>
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{I18n.t('listing')}</Text>
        {/* <Text style={styles.simpleText}>{item.listing_title}</Text> */}
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 0.5,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <HTML
            html={item?.listing_title}
            // eslint-disable-next-line react-native/no-inline-styles
            baseFontStyle={{
              fontFamily: family.Montserrat_Regular,
              fontSize: size.tiny,
              color: colors.black,
              textAlign: 'center',
              flex: 0.5,
              textTransform: 'capitalize',
              alignSelf: 'flex-start',
            }}
          />
        </View>
      </View>
      <Divider />
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>Date</Text>
        <Text style={styles.simpleText}>
          {item?.date}
          {/* {moment(item?.date_created?.date).format('LL')} */}
        </Text>
      </View>
      <Divider />
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>Message</Text>
        <Text style={styles.simpleText}>{item?.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    // height: HP('14'),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginTop: WP('3'),
    backgroundColor: colors.white,
    padding: WP('2'),
  },
  scrollView: {
    paddingBottom: HP('14'),
  },
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WP('3'),
    height: HP('5.5'),
  },
  primaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WP('3'),
    height: HP('7'),
    backgroundColor: colors.p2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  simpleText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
    textAlign: 'left',
    flex: 0.5,
    textTransform: 'capitalize',
  },
  whiteText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.xsmall,
    color: colors.white,
  },
  priceText: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    color: colors.black,
    flex: 0.5,
  },
  divider: {
    width: '100%',
  },
  actionView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export {ClaimedCard};
