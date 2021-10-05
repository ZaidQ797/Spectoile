/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import {HP, colors, WP, family, size, appIcons} from '../../../utilities';
import I18n from '../../../translation';

const ResearchCard = ({item, key, onDelete}) => {
  return (
    <View key={key} style={styles.priceContainer}>
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{I18n.t('personalized_search')}</Text>
        <Text style={[styles.simpleText, {textAlign: 'right'}]}>
          {item?.custom_search}
        </Text>
      </View>
      <Divider />
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{I18n.t('location')}</Text>
        <Text style={[styles.simpleText, {textAlign: 'right'}]}>
          {item?.location === '' || item?.location === 'undefined'
            ? '-'
            : item?.location}
        </Text>
      </View>
      <Divider />
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>{I18n.t('category')}</Text>
        <Text style={[styles.simpleText, {textAlign: 'right'}]}>
          {item?.category === '' || item.category === undefined
            ? '-'
            : item?.category}
        </Text>
      </View>
      <Divider />
      <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>Tag</Text>
        <Text
          numberOfLines={1}
          style={[styles.priceText, {textAlign: 'right'}]}>
          {item?.tag === '' ? '-' : item?.tag}
        </Text>
      </View>
      <Divider />
      <View style={styles.subTotalContainer}>
        <Text style={[styles.simpleText, {textAlign: 'left'}]}>
          {I18n.t('order')}
        </Text>
        <View style={styles.actionView}>
          {/* <TouchableOpacity>
            <Image source={appIcons.linkIcon} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Image style={styles.delIcon} source={appIcons.deleteIcon} />
          </TouchableOpacity>
        </View>
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
    marginHorizontal: WP('5'),
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
    width: WP('50'),
    flex: 0.512,
    // width: 100,
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
    right: WP('30'),
  },
  delIcon: {
    //left: 10,
  },
});

export {ResearchCard};
