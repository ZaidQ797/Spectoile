import * as TYPES from '../types';

//Email Validation Action
export const filterRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.FILTER_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

//Email Validation Action
export const sortFilterRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SORT_FILTER_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

//Email Validation Action
export const activeTabRequest = (key) => {
  return {
    type: TYPES.SET_ACTIVE_TAB,
    key,
  };
};

//Email Validation Action
export const contentScrollingRequest = (key) => {
  return {
    type: TYPES.IS_CONTENT_SCROLLING,
    key,
  };
};
