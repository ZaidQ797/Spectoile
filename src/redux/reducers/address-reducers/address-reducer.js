import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  billingAddress: {
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    email: '',
    shippingMethod: '',
  },
  addresses: null,
  editAddressRes: '',
  error: null,
  isSuccess: false,
  isFailure: false,
};
const addressReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_ADDRESSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_ADDRESSES_FAILURE:
      return {
        ...state,
        loading: false,
        addresses: null,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.EDIT_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.EDIT_ADDRESS_REQUEST:
      return {
        ...state,
        loading: false,
        editAddressRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.EDIT_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        editAddressRes: null,
        isSuccess: false,
        isFailure: true,
      };
    default:
      return state;
  }
};
export default addressReducer;
