import * as TYPES from '../types';

//get profile action
export const getProfileRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_PROFILE_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

//edit profile action
export const editProfileRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.EDIT_PROFILE_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};
