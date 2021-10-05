import {combineReducers} from 'redux';

import loginReducer from './auth-reducers/login-reducer';
import signUpReducer from './auth-reducers/signup-reducer';
import drawerReducer from './drawer-reducers/drawer-reducer';
import categoriesReducer from './categories-reducer/categories-reducer';
import servicesReducer from './services-reducer/services-reducer';
import wishlistReducer from './wishlist-reducers/wishlist-reducer';
import filterReducer from './filter-reducers/filter-reducer';
import profileReducer from './profile-reducers/profile-reducers';
import packagesReducer from './package-reducer/package-reducer';
import addListingReducer from './add-listing-reducers/add-listing-reducer';
import cartReducer from './cart-reducers/cart-reducers';
import orderReducer from './order-reducers/order-reducer';
import addressReducer from './address-reducers/address-reducer';

export default combineReducers(
  Object.assign({
    signup: signUpReducer,
    login: loginReducer,
    drawer: drawerReducer,
    categories: categoriesReducer,
    services: servicesReducer,
    wishlist: wishlistReducer,
    filter: filterReducer,
    profile: profileReducer,
    packages: packagesReducer,
    listings: addListingReducer,
    cart: cartReducer,
    orders: orderReducer,
    address: addressReducer,
  }),
);
