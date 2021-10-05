import {fork} from 'redux-saga/effects';

import {loginRequest} from './auth-saga/login-saga';
import {signUpRequest} from './auth-saga/signup-saga';
import {categoryRequest} from './categories-saga/categories-saga';
import {serviceRequest} from './services-saga/services-saga';
import {wishlistRequest} from './wishlist-saga/wishlist-saga';
import {filterRequest} from './filter-saga/filter-saga';
import {searchRequest} from './filter-saga/search-saga';
import {profileRequest} from './profile-saga/profile-saga';
import {packagesRequest} from './package-saga/packages-saga';
import {listingRequest} from './add-listing-saga/add-listing-saga';
import {cartRequest} from './cart-saga/cart-saga';
import {orderRequest} from './orders-saga/order-saga';
import {addressRequest} from './address-saga/address-saga';

export function* rootSaga() {
  yield fork(loginRequest);
  yield fork(signUpRequest);
  yield fork(categoryRequest);
  yield fork(serviceRequest);
  yield fork(wishlistRequest);
  yield fork(filterRequest);
  yield fork(searchRequest);
  yield fork(profileRequest);
  yield fork(packagesRequest);
  yield fork(listingRequest);
  yield fork(cartRequest);
  yield fork(orderRequest);
  yield fork(addressRequest);
}
