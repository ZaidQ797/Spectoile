import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  orders: [],
  paymentGateways: [],
  deleteGatewayRes: null,
  orderDetail: null,
  applyCoupenRes: null,
  removeCoupenRes: null,
  checkoutNonce: '',
  placeOrderRes: null,
  error: null,
  isSuccess: false,
  isFailure: false,
};
const orderReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_ORDERS_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetail: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.ORDER_DETAIL_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.PAYMENT_GETEWAYS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.PAYMENT_GETEWAYS_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentGateways: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.PAYMENT_GETEWAYS_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.ADD_PAYMENT_GATEWAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.ADD_PAYMENT_GATEWAY_SUCCESS:
      return {
        ...state,
        loading: false,
        addPaymentGtRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.ADD_PAYMENT_GATEWAY_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.APPLY_COUPEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.APPLY_COUPEN_SUCCESS:
      return {
        ...state,
        loading: false,
        addPaymentGtRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.APPLY_COUPEN_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.CHECKOUT_NONCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.CHECKOUT_NONCE_SUCCESS:
      return {
        ...state,
        loading: false,
        checkoutNonce: actions.data?.nonce_value,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.CHECKOUT_NONCE_REQUEST:
      return {
        ...state,
        error: actions.error,
        checkoutNonce: '',
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        addPaymentGtRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.PLACE_ORDER_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.DELETE_PAYMENT_GATEWAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.DELETE_PAYMENT_GATEWAY_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteGatewayRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.DELETE_PAYMENT_GATEWAY_FAILURE:
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
export default orderReducer;
