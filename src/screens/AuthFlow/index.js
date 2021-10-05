import React from 'react';
import Login from './Login';
import SignUp from './Signup';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import AddListing from '../MainFlow/Home/AddListing';

import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

export const AuthFlow = () => {
  return (
    <AuthStack.Navigator initialRouteName="CreateAccount" headerMode="none">
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="AddListing" component={AddListing} />
    </AuthStack.Navigator>
  );
};
