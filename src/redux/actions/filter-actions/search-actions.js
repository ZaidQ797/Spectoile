import * as TYPES from '../types';

//Email Validation Action
export const searchRequest = (
  params,
  token,
  cbSuccess,
  cbFailure,
  isLoadMore,
) => {
  return {
    type: TYPES.SEARCH_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
    isLoadMore,
  };
};

//Save Search Action
export const saveSearchRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SAVE_SEARCH_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

//Save Search Action
export const userSavedSearchRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_SAVED_SEARCHES_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

//Save Search Action
export const removeSaveSearchRequest = (
  params,
  token,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.REMOVE_SAVE_SEARCH_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

//Save Search Action
export const sortAlert = (value) => {
  return {
    type: TYPES.SORT_SELECT_ALRET,
    data: value,
  };
};
