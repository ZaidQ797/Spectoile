import * as TYPES from '../types';

export const getWishlistRequest = (
  params,
  token,
  cbSuccess,
  cbFailure,
  isLoadMore,
) => {
  return {
    type: TYPES.GET_WISHLIST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
    token,
    isLoadMore,
  };
};

export const addToWishlistRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_TO_WISHLIST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
    token,
  };
};

export const removeFromWishlistRequest = (
  params,
  token,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.REMOVE_FROM_WISHLIST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
    token,
  };
};

export const wishlistCountRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.WISHLIST_COUNT_REQUEST,
    params,
    cbSuccess,
    cbFailure,
    token,
  };
};
