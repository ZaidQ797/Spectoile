import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  isKeepLogin: null,
  searchObj: {
    category: '',
    tag: '',
    orderBy: 'ID',
  },
  activeTab: 'filter', // Will be three 1. filter 2. search 3. default
  scrolling: false, //    Getting scroll of flatlist in nested tabs in search result
  sortFilterResults: null,
  saveSearchRes: null,
  searchResult: [],
  filterResults: [],
  userSavedSearches: [],
  savedSearchID: {},
  markersList: [],
  sortAlert: '',
  error: null,
  isSuccess: false,
  isFailure: false,
};
const filterReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: actions.key,
      };
    case TYPES.IS_CONTENT_SCROLLING:
      return {
        ...state,
        scrolling: actions.key,
      };
    case TYPES.SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SORT_SELECT_ALRET:
      return {
        ...state,
        loading: false,
        sortAlert: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.LOAD_MORE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: [...state.searchResult, ...actions.data],
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SEARCH_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.FILTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        filterResults: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.FILTER_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.SAVE_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.SAVE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        saveSearchRes: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SAVE_SEARCH_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.SORT_FILTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.SORT_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        sortFilterRequest: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.SORT_FILTER_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.GET_SAVED_SEARCHES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.GET_SAVED_SEARCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        userSavedSearches: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_SAVED_SEARCHES_FAILURE:
      return {
        ...state,
        error: actions.error,
        isLoggedIn: false,
        isSuccess: false,
        isFailure: true,
      };
    case TYPES.REMOVE_SAVE_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TYPES.REMOVE_SAVE_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        savedSearchID: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.REMOVE_SAVE_SEARCH_FAILURE:
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
export default filterReducer;
