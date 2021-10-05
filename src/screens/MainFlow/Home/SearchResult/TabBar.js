import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors, WP, appIcons} from '../../../../utilities';
import {Divider} from 'react-native-elements';
import Icons from 'react-native-vector-icons/AntDesign';

export const TabBar = (props) => {
  const {state, descriptors, navigation} = props;

  let tabIconColor = 'grey';
  let selectedTabIconColor = 'orange';
  const IconStyle = {
    Home: {icon: appIcons.favorite, color: tabIconColor},
    Search: {icon: appIcons.search, color: tabIconColor},
    Add: {icon: appIcons.createEvent, color: 'red'},
    Conversation: {icon: appIcons.chat, color: tabIconColor},
    Profile: {icon: appIcons.userProfile, color: tabIconColor},
  };

  const _renderItem = (name, onPress, focused) => {
    let icon = IconStyle[name];
    return (
      <View>
        <TouchableOpacity style={styles.tabContainer} onPress={onPress}>
          <Text>{name}</Text>

          {/* <Icons
          size={WP('8')}
          name={icon.icon}
          color={focused ? selectedTabIconColor : icon.color}
        /> */}
        </TouchableOpacity>
        <Divider />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return _renderItem(label, onPress, isFocused);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WP('15'),
    //width: WP('100'),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: WP('5'),
  },
  tabContainer: {
    padding: WP('5'),
    // borderBottomWidth: 1,
  },
});
