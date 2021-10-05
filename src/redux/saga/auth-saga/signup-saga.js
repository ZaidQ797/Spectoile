import {put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actions/types';
import {endPoints} from '../../../services';
import Api from '../../../services/api';

export function* signUpRequest() {
  yield takeLatest(types.SIGNUP_REQUEST, signUp);
  yield takeLatest(types.VALIDATE_TOKEN_REQUEST, validateToken);
}

function* signUp(params) {
  console.log('[signUp-saga]', params);
  try {
    let response = yield Api.postRequest(endPoints.signup, params.params);
    console.log('Response =======> ', response);
    if (response) {
      console.log('response exits');
      if (
        response?.data?.data?.status === 403 ||
        response?.data?.data?.status === 400 ||
        response?.data?.data?.status === 500
      ) {
        console.log('fail', response);
        params.cbFailure(response?.data?.message);
      } else {
        console.log('pass', response);
        params.cbSuccess(response);
        yield put({type: types.SIGNUP_SUCCESS, data: response});
      }
    }
  } catch (error) {
    console.log('Error from SignUp RequestSaga =======> ', error);
    params.cbFailure(error);
    yield put({type: types.SIGNUP_FAILURE, data: error});
  }
}

function* validateToken(params) {
  console.log('validateToken saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.validateToken,
      null,
      params.params,
    );
    if (response) {
      if (response?.data?.status === 200) {
        params.cbSuccess(response);
        yield put({type: types.VALIDATE_TOKEN_SUCCESS, data: response});
      } else {
        params.cbFailure('Token expired');
        yield put({type: types.VALIDATE_TOKEN_FAILURE, data: 'Token expired'});
      }
    } else {
      params.cbFailure('Invalid email and password');
      yield put({type: types.VALIDATE_TOKEN_FAILURE, data: 'Token expired'});
    }
  } catch (error) {
    yield put({type: types.VALIDATE_TOKEN_FAILURE, data: error});
    params.cbFailure(error);
  }
}
