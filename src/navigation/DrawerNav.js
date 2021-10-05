import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerComponent} from '../components';
import {AddListingFlow} from '../screens/MainFlow';
import {WP, HP} from '../utilities';
import {useSelector} from 'react-redux';

import {DashboardFlow, AccountFlow, HomeFlow} from '../screens/MainFlow';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = ({route}) => {
  const {initialScreen} = useSelector((state) => state.drawer);

  useEffect(() => {}, [initialScreen]);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerComponent {...props} />}
      drawerStyle={styles.drawer}
      initialRouteName={initialScreen !== 'App' ? 'AddListingFlow' : 'App'}
      drawerPosition={'left'}>
      <Drawer.Screen name="App" component={HomeFlow} />
      <Drawer.Screen name="AccountFlow" component={DashboardFlow} />
      <Drawer.Screen name="DashboardFlow" component={AccountFlow} />
      <Drawer.Screen name="AddListingFlow" component={AddListingFlow} />
    </Drawer.Navigator>
  );
};

export const styles = StyleSheet.create({
  drawer: {
    width: WP('80%'),
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
