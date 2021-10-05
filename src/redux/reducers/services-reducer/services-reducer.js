import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  services: [],
  serviceDetail: null,
  addReviewRes: null,
  randomPost: {},
  error: null,
  isSuccess: false,
  isFailure: false,
};
const servicesReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.GET_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        services: actions.data[1],
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.LOAD_MORE_SERVICES_SUCCESS:
      console.log(actions);
      return {
        ...state,
        loading: false,
        services: [...state.services, ...actions.data[1]],
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_SERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
      };

    case TYPES.GET_SERVICES_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.SERVICE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false,
        serviceDetail: null,
      };
    case TYPES.SERVICE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        serviceDetail: actions.data[0],
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SERVICE_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.ADD_REVIEW_REQUEST:
      return {
        ...state,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        addReviewRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.ADD_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.RANDOM_POST_REQUEST:
      return {
        ...state,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.RANDOM_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        randomPost: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.RANDOM_POST_FAILURE:
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
export default servicesReducer;
