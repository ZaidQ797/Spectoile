import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  cart: [],
  error: null,
  isSuccess: false,
  isFailure: false,
};
const cartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_CART_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        addToCartRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.ADD_TO_CART_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        removeCartRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.REMOVE_FROM_CART_FAILURE:
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
export default cartReducer;
