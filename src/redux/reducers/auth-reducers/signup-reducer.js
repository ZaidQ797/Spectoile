import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  userInfo: null,
  tokenValidate: false,
  error: null,
  isSuccess: false,
  isFailure: false,
};
const signUpReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenValidate: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
      };
    default:
      return state;
  }
};
export default signUpReducer;
