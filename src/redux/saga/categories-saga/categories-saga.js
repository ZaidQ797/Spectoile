import {takeLatest, put} from 'redux-saga/effects';
import * as types from '../../actions/types';
import Api from '../../../services/api';
import {endPoints} from '../../../services';
import store from '../../store';

export function* categoryRequest() {
  yield takeLatest(types.GET_CATEGORIES_REQUEST, getCategories);
  yield takeLatest(types.UPDATE_CATEGORY_REQUEST, updateCategory);
}

function* getCategories(params) {
  console.log('logout saga]', params.params);
  try {
    let response = yield Api.postRequest(
      endPoints.getCategories,
      null,
      params.params,
    );
    if (
      response?.data?.status !== 422 ||
      response?.data?.status !== 500 ||
      response?.data?.status !== 429
    ) {
      console.log('categories', response);
      params.cbSuccess(response?.filter((elem) => elem.icon !== false));
      yield put({
        type: types.GET_CATEGORIES_SUCCESS,
        data: response?.filter((elem) => elem.icon !== false),
      });
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_CATEGORIES_FAILURE, error: response});
    }
  } catch (error) {
    console.log('error from login request saga -- > > >  > ', error);
    params.cbFailure(error);
    yield put({type: types.GET_CATEGORIES_FAILURE, error: error});
  }
}

function* updateCategory(params) {
  console.log('updateCategory saga]', params.params);
  try {
    let newArray = params.params.categories?.map((item) => {
      item.selected = false;
      if (item.slug === params.params.slug) {
        return {
          ...item,
          selected: true,
        };
      }
      return item;
    });
    console.log('new array ', newArray);
    let selecedtItem = newArray?.filter((elem) => elem.selected);
    if (selecedtItem) {
      params.cbSuccess(selecedtItem[0]?.slug);
      yield put({type: types.UPDATE_CATEGORY_SUCCESS, data: newArray});
    } else {
      params.cbFailure('Server Error');
      yield put({type: types.GET_CATEGORIES_FAILURE, error: 'error'});
    }
  } catch (error) {
    console.log('error from login request saga -- > > >  > ', error);
    params.cbFailure(error);
    yield put({type: types.GET_CATEGORIES_FAILURE, error: error});
  }
}
