import React from 'react';

//Home
import Home from './Home';
import ServiceDetail from './Home/ServiceDetail';
import SearchResult from './Home/SearchResult';
import Contact from './Home/ServiceDetail/Contact';
import RandomListing from './Home/RandomListing';

import Search from './Search';
import Favorites from './Favorites';

//Add listing
import AddListing from '../MainFlow/Home/AddListing';
import Packages from '../MainFlow/Home/AddListing/Packages';
import Cart from '../MainFlow/Home/Cart';
import Checkout from '../MainFlow/Home/Checkout';
import AddBillingAdd from '../MainFlow/Home/Checkout/AddBillingAdd';
import Thankyou from '../MainFlow/Home/Thankyou';

//Account
import Account from './Account';
import AddMyListing from './Account/AddListing';
import Downloads from './Account/Downloads';
import MyPackages from './Account/MyPackages';
import MyListing from './Account/MyListing';
import MyReferrals from './Account/MyReferrals';
import MyReaserch from './Account/MyReaserch';
import Reported from './Account/Reported';
import Claims from './Account/Claims';

//Dashboard
import Dashboard from './Dashboard';
import Profile from './Dashboard/Profile';
import EditProfile from './Dashboard/EditProfile';
import Orders from './Dashboard/Orders';
import OrderDetail from './Dashboard/Orders/OrderDetail';
import Addresses from './Dashboard/Addresses';
import AddAddress from './Dashboard/AddAddress';
import PaymentsMeans from './Dashboard/PaymentMeans';
import AddPaymentMethod from './Dashboard/PaymentMeans/AddPayment';

import {createStackNavigator} from '@react-navigation/stack';

//Drawer Home
const HomeStack = createStackNavigator();

export const HomeFlow = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ServiceDetail" component={ServiceDetail} />
      <HomeStack.Screen name="Contact" component={Contact} />
      <HomeStack.Screen name="SearchResult" component={SearchResult} />
      <HomeStack.Screen name="Search" component={Search} />
      <HomeStack.Screen name="Favorites" component={Favorites} />
      <HomeStack.Screen name="RandomListing" component={RandomListing} />
    </HomeStack.Navigator>
  );
};

const AddListingStack = createStackNavigator();

export const AddListingFlow = () => {
  return (
    <AddListingStack.Navigator initialRouteName="Packages" headerMode="none">
      <AddListingStack.Screen name="Packages" component={Packages} />
      <AddListingStack.Screen name="Cart" component={Cart} />
      <AddListingStack.Screen name="Checkout" component={Checkout} />
      <AddListingStack.Screen name="AddBillingAdd" component={AddBillingAdd} />
      <AddListingStack.Screen name="Thankyou" component={Thankyou} />
    </AddListingStack.Navigator>
  );
};

//Drawer Account
const AccountStack = createStackNavigator();

export const AccountFlow = () => {
  return (
    <AccountStack.Navigator initialRouteName="Account" headerMode="none">
      <AccountStack.Screen name="Account" component={Account} />
      <AccountStack.Screen name="AddMyListing" component={AddMyListing} />
      <AccountStack.Screen name="Downloads" component={Downloads} />
      <AccountStack.Screen name="MyPackages" component={MyPackages} />
      <AccountStack.Screen name="MyReferrals" component={MyReferrals} />
      <AccountStack.Screen name="MyListing" component={MyListing} />
      <AccountStack.Screen name="MyReaserch" component={MyReaserch} />
      <AccountStack.Screen name="Reported" component={Reported} />
      <AccountStack.Screen name="Claims" component={Claims} />
    </AccountStack.Navigator>
  );
};

//Drawer Dashboard
const DashboardStack = createStackNavigator();

export const DashboardFlow = () => {
  return (
    <DashboardStack.Navigator initialRouteName="Dashboard" headerMode="none">
      <DashboardStack.Screen name="Dashboard" component={Dashboard} />
      <DashboardStack.Screen name="Profile" component={Profile} />
      <DashboardStack.Screen name="EditProfile" component={EditProfile} />
      <DashboardStack.Screen name="Orders" component={Orders} />
      <DashboardStack.Screen name="OrderDetail" component={OrderDetail} />
      <DashboardStack.Screen name="Addresses" component={Addresses} />
      <AddListingStack.Screen
        name="AddBillingAddress"
        component={AddBillingAdd}
      />
      <DashboardStack.Screen name="AddAddress" component={AddAddress} />
      <DashboardStack.Screen name="PaymentMeans" component={PaymentsMeans} />
      <DashboardStack.Screen
        name="AddPaymentMethod"
        component={AddPaymentMethod}
      />
    </DashboardStack.Navigator>
  );
};
