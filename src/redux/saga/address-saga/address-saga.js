import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';

export function* addressRequest() {
  yield takeLatest(types.GET_ADDRESSES_REQUEST, getAddress);
  yield takeLatest(types.EDIT_ADDRESS_REQUEST, editAddress);
}

function* getAddress(params) {
  console.log('getAddress saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.getAddresses,
      params.params,
      {
        token: params.token,
      },
    );
    console.log('saga response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.GET_ADDRESSES_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_ADDRESSES_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_ADDRESSES_FAILURE, error: error});
  }
}

function* editAddress(params) {
  console.log('editAddress saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.editAddress, params.params, {
      token: params.token,
    });
    console.log('saga response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.EDIT_ADDRESS_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.EDIT_ADDRESS_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.EDIT_ADDRESS_FAILURE, error: error});
  }
}
