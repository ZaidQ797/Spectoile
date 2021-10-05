import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  colors,
  family,
  HP,
  size,
  WP,
  appImages,
  appIcons,
} from '../../utilities';
import {useSelector} from 'react-redux';
import {hasNotch} from 'react-native-device-info';

const ProfileCard = ({params}) => {
  const {profile} = useSelector((state) => state.profile);
  return (
    <View style={styles.container}>
      <Image
        resizeMode={'contain'}
        source={
          profile?.profile_image !== ''
            ? {uri: profile?.profile_image}
            : appImages.userImage
        }
        style={styles.image}
      />
      <View style={styles.body}>
        <Text style={styles.name}>
          {profile?.user_first_name[0]} {profile?.user_last_name[0]}
        </Text>
        <Text style={styles.email}>{profile?.user_email}</Text>
        <Image
          source={appIcons.completeProfile}
          resizeMode={'contain'}
          style={styles.completeIcon}
        />
        <Text
          style={[styles.email, {fontSize: size.small, marginTop: WP('2')}]}>
          100% Terminé
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hasNotch() ? HP('35') : HP('41'),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    marginTop: HP('10'),
  },
  name: {
    textAlign: 'center',
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xsmall,
    marginBottom: HP('2'),
  },
  email: {
    textAlign: 'center',
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
  },
  image: {
    alignSelf: 'center',
    bottom: 50,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  body: {
    bottom: WP('5'),
  },
  completeIcon: {
    alignSelf: 'center',
    marginTop: WP('5'),
    width: WP('18'),
    height: HP('10'),
  },
});

export {ProfileCard};
