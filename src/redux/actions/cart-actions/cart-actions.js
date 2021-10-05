import * as TYPES from '../types';

export const getCartRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CART_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const addToCartRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_TO_CART_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const removeFromCartRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.REMOVE_FROM_CART_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};
