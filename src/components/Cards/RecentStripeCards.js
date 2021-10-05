import React, {Fragment, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Divider} from 'react-native-elements';
import {HP, colors, WP, family, size, appIcons} from '../../utilities';

const RecentStripeCards = ({recentCards = [], onCardSelection}) => {
  useEffect(() => {
    // console.log('recentCards', recentCards);
  }, [recentCards]);

  return (
    <View style={styles.priceContainer}>
      {recentCards?.map((item, index) => (
        <Fragment key={index}>
          <View style={styles.subTotalContainer}>
            <Text style={styles.simpleText}>{item.display_name}</Text>
            <TouchableOpacity onPress={() => onCardSelection(item)}>
              <Image
                style={styles.radio}
                source={
                  item.selected
                    ? appIcons.radioChecked
                    : appIcons.radioUnchecked
                }
              />
            </TouchableOpacity>
          </View>
          <Divider />
        </Fragment>
      ))}
      {/* <View style={styles.subTotalContainer}>
        <Text style={styles.simpleText}>
          Utilisez un nouveau mode de paiement
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={styles.radio}
            source={true ? appIcons.radioChecked : appIcons.radioUnchecked}
          />
        </TouchableOpacity>
      </View> */}
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
  },
  scrollView: {
    paddingBottom: HP('14'),
  },
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: WP('3'),
    height: HP('5'),
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
  },
  whiteText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.xsmall,
    color: colors.white,
  },
  priceText: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.small,
    color: colors.red,
  },
  divider: {
    width: '100%',
  },
});

export {RecentStripeCards};
