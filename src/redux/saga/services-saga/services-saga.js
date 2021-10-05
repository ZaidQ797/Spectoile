import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';

export function* serviceRequest() {
  yield takeLatest(types.GET_SERVICES_REQUEST, getServices);
  yield takeLatest(types.SERVICE_DETAIL_REQUEST, getServicesDetail);
  yield takeLatest(types.ADD_REVIEW_REQUEST, addReview);
  yield takeLatest(types.RANDOM_POST_REQUEST, getRandomPost);
}

function* getServices(params) {
  //  console.log('getServices saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.getServices, params.params, {
      token: params.token,
    });
    if (
      response?.data?.status !== 422 ||
      response?.data?.status !== 500 ||
      response?.data?.status !== 429 ||
      response?.data?.status !== 403
    ) {
      if (params.isLoadMore) {
        params.cbSuccess(response);
        yield put({type: types.LOAD_MORE_SERVICES_SUCCESS, data: response});
      } else {
        params.cbSuccess(response);
        yield put({type: types.GET_SERVICES_SUCCESS, data: response});
      }
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_SERVICES_FAILURE, error: response});
    }
  } catch (error) {
    //  console.log('error from service request request saga -- > > >  > ', error);
    params.cbFailure(error);
    yield put({type: types.GET_SERVICES_FAILURE, error: error});
  }
}

function* getRandomPost(params) {
  //  console.log('getServices saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.randomPost, params.params, {
      token: params.token,
    });
    console.log('random res', response);
    if (
      response?.data?.status !== 422 ||
      response?.data?.status !== 500 ||
      response?.data?.status !== 429 ||
      response?.data?.status !== 403
    ) {
      params.cbSuccess(response[0]);
      yield put({type: types.RANDOM_POST_SUCCESS, data: response[0]});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.RANDOM_POST_FAILURE, error: response});
    }
  } catch (error) {
    //  console.log('error from service request request saga -- > > >  > ', error);
    params.cbFailure(error);
    yield put({type: types.RANDOM_POST_FAILURE, error: error});
  }
}

function* getServicesDetail(params) {
  //  console.log('getServicesDetail saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.getServiceDetail,
      params.params,
      {
        token: params.token,
      },
    );
    if (response?.data?.status !== 403) {
      //   console.log('Data is there', response);
      params.cbSuccess(response[0]);
      yield put({type: types.SERVICE_DETAIL_SUCCESS, data: response});
    } else {
      //  console.log('Data is not there', response);
      params.cbFailure('Server Error');
      yield put({type: types.SERVICE_DETAIL_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.SERVICE_DETAIL_FAILURE, error: error});
  }
}

function* addReview(params) {
  //  console.log('addReview saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.addReview, params.params, {
      token: params.token,
    });
    //  console.log(response);
    if (response?.status === 200) {
      params.cbSuccess(response);
      yield put({type: types.ADD_REVIEW_SUCCESS, data: response});
    } else {
      params.cbFailure(response?.data?.code);
      yield put({type: types.ADD_REVIEW_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.ADD_REVIEW_FAILURE, error: error});
  }
}
