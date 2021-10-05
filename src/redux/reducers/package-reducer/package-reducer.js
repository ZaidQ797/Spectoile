import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  userPacks: [],
  packs: [],
  isPackageValid: null,
  error: null,
  isSuccess: false,
  isFailure: false,
};
const packagesReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.USER_PACKAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.USER_PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        userPacks: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.USER_PACKAGES_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.GET_PACKAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        packs: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_PACKAGES_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.VALIDATE_PACKAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.VALIDATE_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isPackageValid: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.VALIDATE_PACKAGE_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    default:
      return state;
  }
};
export default packagesReducer;
