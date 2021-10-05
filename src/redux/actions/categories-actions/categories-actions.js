import * as TYPES from '../types';

export const getCategoriesRequest = (params, cbSuccess, cbFailure) => {
  return {
    type: TYPES.GET_CATEGORIES_REQUEST,
    params,
    cbSuccess,
    cbFailure,
  };
};

export const updateCategories = (slug, cbSuccess, cbFailure) => {
  return {
    type: TYPES.UPDATE_CATEGORY_REQUEST,
    params: slug,
    cbSuccess,
    cbFailure,
  };
};
