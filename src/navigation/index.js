import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const AppStack = createStackNavigator();

import Splash from '../screens/Splash';
import {AuthFlow} from '../screens/AuthFlow';
import {DrawerNavigator} from './DrawerNav';

const MainAppNav = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, [showSplash]);

  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName={'Splash'} headerMode={'none'}>
        {showSplash && <AppStack.Screen name={'Splash'} component={Splash} />}
        <AppStack.Screen name={'App'} component={DrawerNavigator} />
        <AppStack.Screen name={'Auth'} component={AuthFlow} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
export default MainAppNav;
