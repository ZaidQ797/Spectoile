import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';

export function* packagesRequest() {
  yield takeLatest(types.USER_PACKAGES_REQUEST, getUserPackages);
  yield takeLatest(types.GET_PACKAGES_REQUEST, getPackages);
  yield takeLatest(types.VALIDATE_PACKAGE_REQUEST, validatePackages);
}

function* getUserPackages(params) {
  // console.log('getUserPackages saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.userPacks, null, params);
    // console.log('Saga response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.USER_PACKAGES_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.USER_PACKAGES_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.USER_PACKAGES_FAILURE, error: error});
  }
}

function* getPackages(params) {
  // console.log('getUserPackages saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.getPacks, null, params);
    //  console.log('Saga response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.GET_PACKAGES_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_PACKAGES_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_PACKAGES_FAILURE, error: error});
  }
}

function* validatePackages(params) {
  // console.log('validatePackages saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.validatePackage,
      null,
      params,
    );
    //  console.log('Saga response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.VALIDATE_PACKAGE_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.VALIDATE_PACKAGE_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.VALIDATE_PACKAGE_FAILURE, error: error});
  }
}
