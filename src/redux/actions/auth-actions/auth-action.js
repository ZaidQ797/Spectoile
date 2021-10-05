import * as TYPES from '../types';

//Email Validation Action
export const loginRequest = (params, cbSuccess, cbFailure, rememberMe) => {
  return {
    type: TYPES.LOGIN_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
    rememberMe,
  };
};

//Sign up obj Action
export const signUpAction = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.SIGNUP_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Save user info Action
export const forgotPassword = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.FORGOT_PASSWORD_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Validate token Action
export const validateToken = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.VALIDATE_TOKEN_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Validate token Action
export const setAppleUser = (params) => {
  return {
    type: TYPES.SET_APPLE_USER_REQUEST,
    data: params,
  };
};

//Logout Action
export const logoutRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.LOGOUT_REQUEST_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Get Apple User Action
export const getAppleUserRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_APPLE_USER_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

//Social authentication user
export const socialAuthRequest = (
  params,
  cbSuccess,
  cbFailure,
  type,
  rememberMe,
) => {
  let temp =
    type === 'apple'
      ? TYPES.SOCIAL_APPLE_REQUEST
      : type === 'facebook'
      ? TYPES.SOCIAL_FACEBOOK_REQUEST
      : TYPES.SOCIAL_GOOGLE_REQUEST;
  return {
    type: temp,
    params,
    cbSuccess,
    cbFailure,
    rememberMe,
  };
};

//Get GridView User Action
export const setGridView = (value) => {
  return {
    type: TYPES.SET_GRID_VIEW,
    data: value,
  };
};

//Get GridView User Action
export const updateAuthType = (value) => {
  return {
    type: TYPES.UPDATE_AUTH_TYPE_SUCCESS,
    data: value,
  };
};
