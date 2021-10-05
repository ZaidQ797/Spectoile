import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {appIcons, colors, family, size, WP, appImages} from '../../utilities';

const CartCard = ({
  item,
  index,
  onDelete,
  withCrossIcon = true,
  localizedPrice,
}) => {
  return (
    <TouchableOpacity disabled key={index} style={styles.main}>
      <View style={styles.imageContainer}>
        <Image source={appImages.cartItemPic} style={styles.image} />
      </View>
      <View style={styles.InfoContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>{item.title}</Text>
          {withCrossIcon ? (
            <TouchableOpacity onPress={() => onDelete(item.key)}>
              <Image
                resizeMode={'contain'}
                source={appIcons.crossIcon}
                style={styles.crossIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.row}>
          <Text style={styles.priceLable}>
            {/* CHF {item.line_total?.toFixed(2)} */}
            {localizedPrice}
          </Text>
          <Text style={styles.packageLable}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    height: WP('20'),
    marginVertical: WP('2'),
    borderRadius: 5,
    backgroundColor: colors.white,
    borderColor: colors.border,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoContainer: {
    flex: 0.8,
    justifyContent: 'space-around',
  },
  image: {
    width: WP('15'),
    height: WP('15'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: WP('3'),
    alignItems: 'center',
  },
  crossIcon: {
    width: WP('5'),
    height: WP('2.9'),
  },
  label: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.small,
  },
  priceLable: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.xxsmall,
    color: colors.p1,
  },
  packageLable: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xxxtiny,
    color: colors.p2,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export {CartCard};
