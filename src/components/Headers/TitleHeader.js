import React from 'react';
import {StyleSheet, View, Text, Platform, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {WP, HP, colors, appIcons, family, size} from '../../utilities';

const TitleHeader = ({onLeftPress, right, title, withRight}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onLeftPress}>
          <Image
            source={appIcons.chevronLeft}
            style={styles.menuIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>{withRight ? right : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WP('100%'),
    height: HP('9'),
    flexDirection: 'row',
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  leftContainer: {flex: 0.2, justifyContent: 'center', alignItems: 'center'},
  body: {flex: 0.6, justifyContent: 'center', alignItems: 'center'},
  rightContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {width: WP('12'), height: HP('7')},
  icon: {width: WP('6'), height: HP('2.5')},
  menuIcon: {width: WP('7'), height: HP('2')},
  title: {fontFamily: family.Montserrat_Bold, fontSize: size.medium},
});

export {TitleHeader};
