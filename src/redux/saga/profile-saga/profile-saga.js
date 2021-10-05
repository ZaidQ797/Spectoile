import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';

export function* profileRequest() {
  yield takeLatest(types.GET_PROFILE_REQUEST, getProfile);
  yield takeLatest(types.EDIT_PROFILE_REQUEST, editProfile);
}

function* getProfile(params) {
  //console.log('getProfile saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.getProfile, params.params, {
      token: params.token,
    });
    //  console.log('saga response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.GET_PROFILE_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_PROFILE_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_PROFILE_FAILURE, error: error});
  }
}

function* editProfile(params) {
  // console.log('editProfile saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.editProfile, params.params, {
      token: params.token,
    });
    // console.log('saga response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.EDIT_PROFILE_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.EDIT_PROFILE_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.EDIT_PROFILE_FAILURE, error: error});
  }
}
