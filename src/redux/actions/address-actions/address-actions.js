import * as TYPES from '../types';

export const getAddresses = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_ADDRESSES_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const editAddressRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.EDIT_ADDRESS_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};
