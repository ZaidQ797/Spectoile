import * as TYPES from '../../actions/types';

const initialState = {
  authType: 'email',
  gridView: true,
  loading: false,
  user: null,
  token: '',
  appleRes: '',
  googleRes: '',
  facebookRes: '',
  appleAlreadyLogin: false,
  isLoggedIn: false,
  appleUser: null,
  error: null,
  isSuccess: false,
  isFailure: false,
};
const loginReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.LOGIN_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.SET_GRID_VIEW:
      return {
        ...state,
        gridView: actions.data,
      };
    case TYPES.UPDATE_AUTH_TYPE_SUCCESS:
      return {
        ...state,
        authType: actions.data,
      };
    case TYPES.LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        userProfile: null,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        user: actions.data,
        token: actions.data.token,
        isLoggedIn: actions.rememberMe,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SET_APPLE_USER_REQUEST:
      console.log(actions);
      return {
        ...state,
        loading: false,
        appleUser: actions.data,
        appleAlreadyLogin: true,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        token: '',
        appleRes: '',
        googleRes: '',
        facebookRes: '',
        isLoggedIn: false,
        error: null,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassRes: actions.data,
        isLoggedIn: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_APPLE_USER_SUCCESS:
      return {
        ...state,
        appleUser: actions.data,
        loading: false,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_APPLE_USER_FAILURE:
      return {
        ...state,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
        loading: false,
      };

    //Social Auth
    case TYPES.SOCIAL_GOOGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: actions.data,
        token: actions.data.token,
        isLoggedIn: actions.rememberMe,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SOCIAL_GOOGLE_FAILURE:
      return {
        ...state,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
        loading: false,
      };

    case TYPES.SOCIAL_FACBOOK_SUCCESS:
      console.log('actions', actions);
      return {
        ...state,
        loading: false,
        user: actions.data,
        token: actions.data.token,
        isLoggedIn: actions.rememberMe,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SOCIAL_FACEBOOK_FAILURE:
      return {
        ...state,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
        loading: false,
      };

    case TYPES.SOCIAL_APPLE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: actions.data,
        token: actions.data.token,
        isLoggedIn: actions.rememberMe,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SOCIAL_APPLE_FAILURE:
      return {
        ...state,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
        loading: false,
      };

    default:
      return state;
  }
};
export default loginReducer;
