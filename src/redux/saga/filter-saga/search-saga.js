import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';

export function* searchRequest() {
  yield takeLatest(types.SEARCH_REQUEST, applySearch);
  yield takeLatest(types.SAVE_SEARCH_REQUEST, saveSearch);
  yield takeLatest(types.GET_SAVED_SEARCHES_REQUEST, getSavedSearch);
  yield takeLatest(types.REMOVE_SAVE_SEARCH_REQUEST, removeSavedSearch);
}

function* applySearch(params) {
  console.log('applySearch saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.search, params.params, {
      token: params.token,
    });
    console.log('Saga response', response);
    if (response) {
      if (params.isLoadMore) {
        params.cbSuccess(response);
        yield put({type: types.LOAD_MORE_SEARCH_SUCCESS, data: response.data});
      } else {
        params.cbSuccess(response);
        yield put({type: types.SEARCH_SUCCESS, data: response.data});
      }
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.SEARCH_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.SEARCH_FAILURE, error: error});
  }
}

function* saveSearch(params) {
  console.log('saveSearch saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.saveSearch, params.params, {
      token: params.token,
    });
    console.log('Saga response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.SAVE_SEARCH_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.SAVE_SEARCH_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.SAVE_SEARCH_FAILURE, error: error});
  }
}

function* getSavedSearch(params) {
  console.log('getSavedSearchesSearch saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.userSavedSearches,
      params.params,
      {
        token: params.token,
      },
    );
    console.log(response);
    if (response) {
      let newArr = [];
      Object.entries(response).map((item) => {
        newArr.push({
          id: item[0],
          ...item[1],
        });
      });
      params.cbSuccess(newArr);
      yield put({type: types.GET_SAVED_SEARCHES_SUCCESS, data: newArr});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_SAVED_SEARCHES_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_SAVED_SEARCHES_FAILURE, error: error});
  }
}

function* removeSavedSearch(params) {
  console.log('removeSavedSearch saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.deleteSavedSearch,
      params.params,
      {
        token: params.token,
      },
    );
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.REMOVE_SAVE_SEARCH_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.REMOVE_SAVE_SEARCH_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.REMOVE_SAVE_SEARCH_FAILURE, error: error});
  }
}
