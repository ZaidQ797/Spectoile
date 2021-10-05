import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';

export function* loginRequest() {
  yield takeLatest(types.LOGIN_REQUEST_REQUEST, login);
  yield takeLatest(types.LOGOUT_REQUEST_REQUEST, logout);
  yield takeLatest(types.FORGOT_PASSWORD_REQUEST, forgotPassword);
  yield takeLatest(types.GET_APPLE_USER_REQUEST, getAppleUser);
  yield takeLatest(types.SOCIAL_APPLE_REQUEST, appleAuth);
  yield takeLatest(types.SOCIAL_GOOGLE_REQUEST, googleAuth);
  yield takeLatest(types.SOCIAL_FACEBOOK_REQUEST, facebookAuth);
}

function* login(params) {
  console.log('[login saga]', params);
  console.log('logout saga]', params.rememberMe);
  try {
    let response = yield Api.postRequest(endPoints.login, params.params);
    console.log('login response - - - >>>> ', response);
    if (response) {
      if (response?.data?.data?.status !== 403) {
        params.cbSuccess(response);
        yield put({
          type: types.LOGIN_REQUEST_SUCCESS,
          data: response,
          rememberMe: params.rememberMe,
        });
      } else {
        params.cbFailure('Invalid email and password');
        yield put({
          type: types.LOGIN_REQUEST_FAILURE,
          data: response,
          rememberMe: params.rememberMe,
        });
      }
    } else {
      params.cbFailure('Invalid email and password');
    }
  } catch (error) {
    console.log('error from login request saga -- > > >  > ', error);
    params.cbFailure(error);
  }
}

function* logout(params) {
  console.log('logout saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.logout, null, params.params);
    if (response) {
      if (response?.data?.status === 200) {
        params.cbSuccess(response);
        yield put({type: types.LOGOUT_REQUEST_SUCCESS, data: response});
      } else {
        params.cbSuccess(response);
        yield put({type: types.LOGOUT_REQUEST_SUCCESS, data: response});
        params.cbSuccess(response);

        //Expiring token from my app side.
        // params.cbFailure('Token expired');
      }
    } else {
      params.cbFailure('Invalid email and password');
    }
  } catch (error) {
    console.log('error from login request saga -- > > >  > ', error);
    params.cbFailure(error);
  }
}

function* forgotPassword(params) {
  console.log('forgot password saga]', params.params);
  try {
    let config = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    let response = yield Api.axiosPost(
      endPoints.forgotPass,
      params.params,
      config,
    );
    if (response) {
      console.log(response);
      if (response?.data?.data?.status === 400) {
        yield put({type: types.FORGOT_PASSWORD_FAILURE, data: response});
        params.cbFailure(response?.data?.code);
      } else {
        params.cbSuccess(response);
        // yield put({type: types.FORGOT_PASSWORD_SUCCESS, data: response});
      }
    } else {
      yield put({type: types.FORGOT_PASSWORD_FAILURE, data: response});
      params.cbFailure(`Username or email doesn't exist`);
    }
  } catch (error) {
    yield put({type: types.FORGOT_PASSWORD_FAILURE, data: error});
    console.log('error from login request saga -- > > >  > ', error);
    params.cbFailure(error);
  }
}

function* getAppleUser(params) {
  console.log('getAppleUser saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.getAppleUser,
      null,
      params.params,
    );
    if (response?.data?.status === 200) {
      params.cbSuccess(response);
      yield put({type: types.GET_APPLE_USER_SUCCESS, data: response});
    } else {
      params.cbFailure('Server error');
      yield put({type: types.GET_APPLE_USER_FAILURE, data: response});
    }
  } catch (error) {
    console.log('error from login request saga -- > > >  > ', error);
    params.cbFailure(error);
    yield put({type: types.GET_APPLE_USER_FAILURE, data: error});
  }
}

function* appleAuth(params) {
  console.log('[socialAuth-saga]', params);
  try {
    let response = yield Api.postRequest(endPoints.socialAuth, params.params);
    console.log('response', response);
    if (response) {
      if (
        response?.data?.status === 403 ||
        response?.data?.status === 400 ||
        response?.data?.status === 500
      ) {
        const regex = /(<([^>]+)>)/gi;
        params.cbFailure(response?.message?.replace(regex, ''));
      } else {
        //console.log('pass', response);
        params.cbSuccess(response);
        yield put({
          type: types.SOCIAL_APPLE_SUCCESS,
          data: response,
          rememberMe: params.rememberMe,
        });
      }
    }
  } catch (error) {
    console.log('Error from SocialAuth RequestSaga =======> ', error);
    params.cbFailure(error);
    yield put({type: types.SOCIAL_APPLE_FAILURE, data: error});
  }
}

function* googleAuth(params) {
  console.log('[socialAuth-saga]', params);
  try {
    let response = yield Api.postRequest(endPoints.socialAuth, params.params);
    if (response) {
      if (
        response?.data?.data?.status === 403 ||
        response?.data?.data?.status === 400 ||
        response?.data?.data?.status === 500
      ) {
        console.log('Fail', response);
        params.cbFailure(response?.data?.code);
      } else {
        console.log('Pass', response);
        params.cbSuccess(response);
        yield put({
          type: types.SOCIAL_GOOGLE_SUCCESS,
          data: response,
          rememberMe: params.rememberMe,
        });
      }
    }
  } catch (error) {
    console.log('Error from SocialAuth RequestSaga =======> ', error);
    params.cbFailure(error);
    yield put({type: types.SOCIAL_GOOGLE_FAILURE, data: error});
  }
}

function* facebookAuth(params) {
  console.log('[socialAuth-saga]', params);
  try {
    let response = yield Api.postRequest(endPoints.socialAuth, params.params);
    console.log(response);
    if (response) {
      if (
        response?.data?.data.status === 403 ||
        response?.data?.data.status === 400 ||
        response?.data?.data.status === 500
      ) {
        console.log('fail', response);
        params.cbFailure(response?.data?.code);
      } else {
        console.log('pass', response);
        params.cbSuccess(response);
        yield put({
          type: types.SOCIAL_FACBOOK_SUCCESS,
          data: response,
          rememberMe: params.rememberMe,
        });
      }
    }
  } catch (error) {
    console.log('Error from SocialAuth RequestSaga =======> ', error);
    params.cbFailure(error);
    yield put({type: types.SOCIAL_FACEBOOK_FAILURE, data: error});
  }
}
