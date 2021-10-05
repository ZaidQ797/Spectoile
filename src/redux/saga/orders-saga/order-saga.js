import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';

export function* orderRequest() {
  yield takeLatest(types.GET_ORDERS_REQUEST, getOrders);
  yield takeLatest(types.ORDER_DETAIL_REQUEST, orderDetail);
  yield takeLatest(types.PAYMENT_GETEWAYS_REQUEST, getPaymentGateways);
  yield takeLatest(types.ADD_PAYMENT_GATEWAY_REQUEST, addPaymentGateway);
  yield takeLatest(types.DELETE_PAYMENT_GATEWAY_REQUEST, deletePaymentGateway);
  yield takeLatest(types.APPLY_COUPEN_REQUEST, applyCoupen);
  yield takeLatest(types.CHECKOUT_NONCE_REQUEST, getCheckoutNonce);
  yield takeLatest(types.PLACE_ORDER_REQUEST, placeOrder);
}

function* getOrders(params) {
  // console.log('getOrders saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.getOrders, null, params);
    if (response !== undefined || response !== null) {
      params.cbSuccess(response);
      yield put({type: types.GET_ORDERS_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_ORDERS_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.GET_ORDERS_FAILURE, error: error});
  }
}

function* orderDetail(params) {
  // console.log('orderDetail saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.orderDetail, params.params, {
      token: params.token,
    });
    //  console.log(response);
    if (response !== undefined || response !== null) {
      params.cbSuccess(response);
      yield put({type: types.ORDER_DETAIL_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.ORDER_DETAIL_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.ORDER_DETAIL_FAILURE, error: error});
  }
}

function* getPaymentGateways(params) {
  // console.log('getPaymentGateways saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.getPaymentGT, null, params);
    if (
      response !== undefined ||
      response !== null ||
      response.status === 'status'
    ) {
      let newArr = response?.data?.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
      //  console.log(newArr);
      params.cbSuccess(newArr);
      yield put({type: types.PAYMENT_GETEWAYS_SUCCESS, data: newArr});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.PAYMENT_GETEWAYS_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.PAYMENT_GETEWAYS_FAILURE, error: error});
  }
}

function* addPaymentGateway(params) {
  // console.log('addPaymentGateway saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.addPaymentGT,
      params.params,
      {
        token: params.token,
      },
    );
    //  console.log(response);
    if (response !== undefined || response !== null) {
      params.cbSuccess(response);
      yield put({type: types.ADD_PAYMENT_GATEWAY_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.ADD_PAYMENT_GATEWAY_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.ADD_PAYMENT_GATEWAY_FAILURE, error: error});
  }
}

function* deletePaymentGateway(params) {
  // console.log('deletePaymentGateway saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.deletePaymentCard,
      params.params,
      {
        token: params.token,
      },
    );
    //  console.log(response);
    if (response !== undefined || response !== null) {
      params.cbSuccess(response);
      yield put({type: types.DELETE_PAYMENT_GATEWAY_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.DELETE_PAYMENT_GATEWAY_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.DELETE_PAYMENT_GATEWAY_FAILURE, error: error});
  }
}

function* applyCoupen(params) {
  // console.log('applyCoupen saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.applyCoupen, params.params, {
      token: params.token,
    });
    //  console.log(response);
    if (response !== undefined || response !== null) {
      params.cbSuccess(response[0]);
      yield put({type: types.APPLY_COUPEN_SUCCESS, data: response[0]});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.APPLY_COUPEN_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.APPLY_COUPEN_FAILURE, error: error});
  }
}

function* getCheckoutNonce(params) {
  //console.log('getCheckoutNonce saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.checkoutNonce,
      params.params,
      {
        token: params.token,
      },
    );
    //console.log(response);
    if (response !== undefined || response !== null) {
      params.cbSuccess(response);
      yield put({type: types.CHECKOUT_NONCE_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.CHECKOUT_NONCE_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.CHECKOUT_NONCE_FAILURE, error: error});
  }
}

function* placeOrder(params) {
  // console.log('placeOrder saga]', params.params);
  try {
    let response = yield Api.postRequest(endPoints.placeOrder, params.params, {
      token: params.token,
    });
    // console.log(response);
    if (response !== undefined || response !== null) {
      params.cbSuccess(response);
      yield put({type: types.PLACE_ORDER_SUCCESS, data: response});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.PLACE_ORDER_FAILURE, error: response});
    }
  } catch (error) {
    params.cbFailure(error);
    yield put({type: types.PLACE_ORDER_FAILURE, error: error});
  }
}
