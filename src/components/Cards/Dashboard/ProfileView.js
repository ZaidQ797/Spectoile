import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  colors,
  family,
  HP,
  size,
  WP,
  appImages,
  appIcons,
} from '../../../utilities';
import {IconButton} from '../../../components';
import I18n from '../../../translation';
import {hasNotch} from 'react-native-device-info';
import {useNavigation} from '@react-navigation/native';

const ProfileView = ({data}) => {
  const navigation = useNavigation();

  useEffect(() => {}, [data]);

  return (
    <View style={styles.container}>
      <Image
        resizeMode={'contain'}
        source={{uri: data?.profile_image}}
        style={styles.image}
      />
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.name}>{I18n.t('first_name')}</Text>
          <Text numberOfLines={1} style={styles.email}>
            {data?.user_first_name[0] === ''
              ? data?.display_name
              : data?.user_first_name[0]}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>{I18n.t('last_name')}</Text>
          <Text numberOfLines={1} style={styles.email}>
            {data?.user_last_name[0] === ''
              ? data?.user_nicename
              : data?.user_last_name[0]}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.name}>{I18n.t('email')}</Text>
          <Text numberOfLines={1} style={styles.email}>
            {data?.user_email}
          </Text>
        </View>
        <IconButton
          title={I18n.t('modify_profile')}
          backgroundColor={colors.p1}
          icon={appIcons.editIcon}
          iconColor={colors.white}
          titleColor={colors.white}
          style={styles.button}
          onSubmit={() =>
            navigation.navigate('EditProfile', {
              item: {
                label: I18n.t('modify_profile'),
              },
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HP('35'),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    marginTop: HP('10'),
  },
  name: {
    textAlign: 'left',
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    flex: 0.3,
  },
  email: {
    textAlign: 'left',
    fontFamily: family.Montserrat_Regular,
    fontSize: size.tiny,
    flex: 0.7,
  },
  image: {
    alignSelf: 'center',
    bottom: hasNotch() ? HP('6') : HP('8'),
    // borderRadius: 50,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  body: {
    bottom: WP('5'),
  },
  completeIcon: {
    alignSelf: 'center',
    marginTop: WP('10'),
    width: WP('18'),
    height: HP('10'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: WP('4'),
    marginVertical: HP('1'),
  },
  button: {
    marginHorizontal: WP('5'),
    marginTop: WP('10'),
  },
});

export {ProfileView};
