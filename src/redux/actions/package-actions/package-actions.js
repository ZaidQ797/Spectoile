import * as TYPES from '../types';

//Email Validation Action
export const userPackagesRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.USER_PACKAGES_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

//Email Validation Action
export const getPackagesRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_PACKAGES_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};

export const validatePackageRequest = (params, token, cbSuccess, cbFailure) => {
  return {
    type: TYPES.VALIDATE_PACKAGE_REQUEST,
    params,
    token,
    cbSuccess,
    cbFailure,
  };
};
