import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';

export function* cartRequest() {
  yield takeLatest(types.GET_CART_REQUEST, getCart);
  yield takeLatest(types.ADD_TO_CART_REQUEST, addToCart);
  yield takeLatest(types.REMOVE_FROM_CART_REQUEST, removeFromCart);
}

function* getCart(params) {
  console.log('getCart saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.getCart, null, params);
    if (response) {
      let newArr = Object.values(response).map((item, index) => item);
      params.cbSuccess(newArr);
      yield put({type: types.GET_CART_SUCCESS, data: newArr});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_CART_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_CART_FAILURE, error: error});
  }
}

function* addToCart(params) {
  console.log('addToCart saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.addToCart, params.params, {
      token: params.token,
    });
    console.log(response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.ADD_TO_CART_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.ADD_TO_CART_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.ADD_TO_CART_FAILURE, error: error});
  }
}

function* removeFromCart(params) {
  console.log('removeFromCart saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.removeFromCart,
      params.params,
      {
        token: params.token,
      },
    );
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.REMOVE_FROM_CART_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.REMOVE_FROM_CART_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.REMOVE_FROM_CART_FAILURE, error: error});
  }
}
