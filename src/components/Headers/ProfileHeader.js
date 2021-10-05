import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {WP, HP, colors, family, size, appImages} from '../../utilities';
import {useSelector} from 'react-redux';
import {hasNotch} from 'react-native-device-info';

const ProfileHeader = ({onLeftPress, navigation}) => {
  const {user} = useSelector((state) => state.login);

  useEffect(() => {}, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.profileContainer}>
          <Avatar
            source={appImages.userImage}
            avatarStyle={styles.avatarStyle}
          />
          <Text style={styles.username} numberOfLines={2}>
            {user?.user_display_name}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            {/* <Image
              source={appIcons.crossIcon}
              resizeMode={'contain'}
              style={styles.icon}
            /> */}
            <Icon
              type={'entypo'}
              name={'cross'}
              size={25}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WP('80%'),
    height: hasNotch() ? HP('14.5') : HP('13.5'),
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
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: WP('5'),
    marginTop: WP('5'),
  },
  profileContainer: {
    flex: 0.8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {width: WP('12'), height: HP('7')},
  icon: {width: WP('5'), height: HP('1.7')},
  menuIcon: {width: WP('6'), height: HP('2')},
  username: {
    alignSelf: 'center',
    fontFamily: family.Montserrat_Medium,
    marginLeft: WP(2),
    fontSize: size.xxsmall,
  },
  avatarStyle: {
    borderRadius: 5,
  },
});

export {ProfileHeader};
