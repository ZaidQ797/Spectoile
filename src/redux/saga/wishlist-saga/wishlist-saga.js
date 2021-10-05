import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';

export function* wishlistRequest() {
  yield takeLatest(types.GET_WISHLIST_REQUEST, getWishlist);
  yield takeLatest(types.ADD_TO_WISHLIST_REQUEST, addToWishlist);
  yield takeLatest(types.REMOVE_FROM_WISHLIST_REQUEST, removeFromWishlist);
  yield takeLatest(types.WISHLIST_COUNT_REQUEST, getWishlistCount);
}

function* getWishlist(params) {
  // console.log('getWishlist saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.getWishlist,
      null,
      params.params,
    );
    if (response) {
      if (params?.isLoadMore) {
        params.cbSuccess(response);
        yield put({type: types.LOAD_MORE_SERVICES_SUCCESS, data: response});
      } else {
        params.cbSuccess(response);
        yield put({type: types.GET_WISHLIST_SUCCESS, data: response});
      }
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_WISHLIST_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_WISHLIST_FAILURE, error: error});
  }
}

function* getWishlistCount(params) {
  // console.log('getWishlistCount saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.wishlistCount,
      null,
      params.params,
    );
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.WISHLIST_COUNT_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.WISHLIST_COUNT_FAILURE, error: response});
    }
  } catch (error) {
    // console.log('error from service request request saga -- > > >  > ', error);
    params.cbFailure(error);
    yield put({type: types.WISHLIST_COUNT_FAILURE, error: error});
  }
}

function* addToWishlist(params) {
  // console.log('addToWishlist saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.wishlistAction,
      params.params,
      {
        token: params.token,
      },
    );
    // console.log('Saga response', response);
    if (response.status === 'success') {
      params.cbSuccess(response);
      yield put({type: types.ADD_TO_WISHLIST_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.ADD_TO_WISHLIST_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.ADD_TO_WISHLIST_FAILURE, error: error});
  }
}

function* removeFromWishlist(params) {
  // console.log('getServicesDetail saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.wishlistAction,
      params.params,
      {
        token: params.token,
      },
    );
    if (
      response?.data?.status !== 422 ||
      response?.data?.status !== 500 ||
      response?.data?.status !== 429 ||
      response?.data?.status !== 403
    ) {
      params.cbSuccess(response);
      yield put({type: types.REMOVE_FROM_WISHLIST_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.REMOVE_FROM_WISHLIST_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.REMOVE_FROM_WISHLIST_FAILURE, error: error});
  }
}
