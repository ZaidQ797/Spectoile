import * as TYPES from '../types';

export const getServicesRequest = (
  params,
  token,
  cbSuccess,
  cbFailure,
  isLoadMore,
) => {
  return {
    type: TYPES.GET_SERVICES_REQUEST,
    params,
    cbSuccess,
    cbFailure,
    token,
    isLoadMore,
  };
};

export const getServiceDetail = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SERVICE_DETAIL_REQUEST,
    params,
    cbSuccess,
    cbFailure,
    token,
  };
};

export const addReviewRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_REVIEW_REQUEST,
    params,
    cbSuccess,
    cbFailure,
    token,
  };
};

export const getRandomPostRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.RANDOM_POST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
    token,
  };
};
