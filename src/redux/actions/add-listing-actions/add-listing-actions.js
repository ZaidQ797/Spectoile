import * as TYPES from '../types';

export const addListingRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.ADD_LISTING_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const editListingRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.EDIT_LISTING_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const getListingRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_LISTING_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const deleteListingRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.DELETE_LISTING_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

//Claimed
export const getClaimedRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CLAIMED_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

//Reported
export const getReportedRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_REPORTED_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const getAddListingDataRequest = (
  params,
  token,
  cbSuccess,
  cbFailure,
) => {
  return {
    type: TYPES.GET_ADDLISTING_DATA_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const clearAddListingFormRequest = () => {
  return {
    type: TYPES.CLEAR_ADD_LISTING_FORM,
  };
};

export const addInWeektime = (item) => {
  return {
    type: TYPES.ADD_IN_WEEKTIME,
    data: item,
  };
};

export const removeInWeektime = (id) => {
  return {
    type: TYPES.REMOVE_IN_WEEKTIME,
    data: id,
  };
};

export const addInAdditional = (item) => {
  return {
    type: TYPES.ADD_IN_ADDITIONAL,
    data: item,
  };
};

export const removeFromAdditional = (id) => {
  return {
    type: TYPES.REMOVE_FROM_ADDITIONAL,
    data: id,
  };
};

export const clearWeektimeRequest = () => ({
  type: TYPES.CLEAR_WEEKTIMES,
});

export const clearAdditionalRequest = () => ({
  type: TYPES.CLEAR_ADDITIONAL,
});
