import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';
import {getAddListData} from '../../../utilities';

export function* listingRequest() {
  yield takeLatest(types.ADD_LISTING_REQUEST, addListing);
  yield takeLatest(types.GET_LISTING_REQUEST, getListing);
  yield takeLatest(types.EDIT_LISTING_REQUEST, editListing);
  yield takeLatest(types.DELETE_LISTING_REQUEST, deleteListing);
  yield takeLatest(types.GET_ADDLISTING_DATA_REQUEST, getListingData);
  yield takeLatest(types.GET_CLAIMED_REQUEST, getClaimed);
  yield takeLatest(types.GET_REPORTED_REQUEST, getReported);
}

function* addListing(params) {
  // console.log('addListing saga]', params.params);
  try {
    let response = yield Api.postMulitpart(
      endPoints.addListing,
      params.params,
      {
        token: params.token,
      },
    );
    console.log('addListing response', response);
    if (response?.status === 'success') {
      params.cbSuccess(response);
      yield put({type: types.ADD_LISTING_SUCCESS, data: response?.data});
    } else {
      params.cbFailure(response?.message || 'Server Error');
      yield put({type: types.ADD_LISTING_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.ADD_LISTING_FAILURE, error: error});
  }
}

function* editListing(params) {
  console.log('editListing saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.editListing, params.params, {
      token: params.token,
    });
    console.log('response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.EDIT_LISTING_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.EDIT_LISTING_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.EDIT_LISTING_FAILURE, error: error});
  }
}

function* deleteListing(params) {
  console.log('deleteListing saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.deleteListing,
      params.params,
      {
        token: params.token,
      },
    );
    console.log('response', response);
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.DELETE_LISTING_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.DELETE_LISTING_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.DELETE_LISTING_FAILURE, error: error});
  }
}

function* getListing(params) {
  try {
    let response = yield Api.postRequest(endPoints.getListing, params.params, {
      token: params.token,
    });
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.GET_LISTING_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_LISTING_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_LISTING_FAILURE, error: error});
  }
}

function* getListingData(params) {
  console.log('getListingData saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.getAddListingData,
      params.params,
      {
        token: params.token,
      },
    );
    if (response) {
      let newResponse = getAddListData(response);
      params.cbSuccess(newResponse);
      yield put({type: types.GET_ADDLISTING_DATA_SUCCESS, data: newResponse});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_ADDLISTING_DATA_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_ADDLISTING_DATA_FAILURE, error: error});
  }
}

function* getClaimed(params) {
  try {
    let response = yield Api.postRequest(endPoints.getClaimed, params.params, {
      token: params.token,
    });
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.GET_CLAIMED_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_CLAIMED_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_CLAIMED_FAILURE, error: error});
  }
}

function* getReported(params) {
  try {
    let response = yield Api.postRequest(endPoints.getReported, params.params, {
      token: params.token,
    });
    if (response) {
      params.cbSuccess(response);
      yield put({type: types.GET_REPORTED_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_REPORTED_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_REPORTED_FAILURE, error: error});
  }
}
