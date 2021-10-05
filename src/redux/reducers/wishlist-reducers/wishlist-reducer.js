import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  wishlistCount: null,
  wishlist: [],
  addRes: null,
  removeRes: null,
  error: null,
  isSuccess: false,
  isFailure: false,
};
const wishlistReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.ADD_TO_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.REMOVE_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.WISHLIST_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.GET_WISHLIST_SUCCESS:
      console.log('actions.data', actions.data[1].data);
      return {
        ...state,
        loading: false,
        wishlist: actions.data[1].data,
        wishlistCount: actions.data[0].count,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        addRes: actions.data,
        wishlistCount: actions.data.data.count,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        removeRes: actions.data,
        wishlistCount: actions.data.data.count,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.WISHLIST_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlistCount: actions?.data[0]?.count,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
      };

    case TYPES.ADD_TO_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.REMOVE_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.WISHLIST_COUNT_FAILURE:
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
export default wishlistReducer;
