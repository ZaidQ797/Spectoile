import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';

export function* filterRequest() {
  yield takeLatest(types.FILTER_REQUEST, applyFilter);
  yield takeLatest(types.SORT_FILTER_REQUEST, sortFilter);
}

function* applyFilter(params) {
  console.log('applyFilter saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.filter, params.params, {
      token: params.token,
    });
    console.log('Saga response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.FILTER_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.FILTER_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.FILTER_FAILURE, error: error});
  }
}

function* sortFilter(params) {
  console.log('sortFilter saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.sortFilter, params.params, {
      token: params.token,
    });
    console.log('Saga response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.SORT_FILTER_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.SORT_FILTER_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.SORT_FILTER_FAILURE, error: error});
  }
}
