import * as TYPES from '../types';

export const getOrdersRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ORDERS_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const getOrderDetailRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ORDER_DETAIL_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const getPaymentGatewaysRequest = (
  params,
  token,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.PAYMENT_GETEWAYS_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const addPaymentGetewayRequest = (
  params,
  token,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.ADD_PAYMENT_GATEWAY_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const deletePaymentGetewayRequest = (
  params,
  token,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.DELETE_PAYMENT_GATEWAY_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const applyCoupenRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.APPLY_COUPEN_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const checkoutNonceRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.CHECKOUT_NONCE_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const placeOrderRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.PLACE_ORDER_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};
