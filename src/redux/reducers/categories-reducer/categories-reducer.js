import * as TYPES from '../../actions/types';

const initialState = {
  loading: false,
  categories: [],
  error: null,
  isSuccess: false,
  isFailure: false,
};
const categoriesReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case TYPES.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        isSuccess: false,
        isFailure: false,
      };
    case TYPES.GET_CATEGORIES_SUCCESS:
      let tempCategories = actions.data?.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            selected: true,
          };
        }
        return {
          ...item,
          selected: false,
        };
      });
      return {
        ...state,
        loading: false,
        categories: tempCategories,
        isSuccess: true,
        isFailure: false,
      };
    case TYPES.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error,
        isSuccess: false,
        isFailure: true,
      };

    case TYPES.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: actions.data,
        isSuccess: true,
        isFailure: false,
      };
    default:
      return state;
  }
};
export default categoriesReducer;
