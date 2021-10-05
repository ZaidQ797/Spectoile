import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  profile: null,
  filterResults: {},
  markersList: [],
  error: null,
  isSuccess: false,
  isFailure: false,
};
const profileReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_PROFILE_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.EDIT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.EDIT_PROFILE_FAILURE:
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
export default profileReducer;
