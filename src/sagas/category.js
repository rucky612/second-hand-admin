import axios from 'axios';
import { put, takeEvery, takeLatest, call, spawn } from 'redux-saga/effects';
import { CATEGORY } from '../actions/types';
import { URL } from '../constants/config';
import * as actions from "../actions/category"

const { FETCH_REQUEST } = CATEGORY;

function* getCategorySaga({ payload }) {
  try {
    const res = yield call(axios.get, `${URL}/categories`, {
      params : {
        ...payload
      }
    });
    yield put(actions.getCategorySuc(res.data));
  } catch (e) {
    yield put(actions.getCategoryFail(e));
  } finally {
    yield put(actions.getCategoryEnd());
  }
}

function* deleteCategorySaga({ payload }) {
  const { name, query } = payload;
  try {
    yield call(axios.delete, `${URL}/category`, {
      data: { cg_name: name }
    });
    const res = yield call(axios.get, `${URL}/categories`, {
      params : {
        ...query
      }
    });
    yield put(actions.deleteCategorySuc(res.data));
  } catch (e) {
    yield put(actions.deleteCategoryFail(e));
  } finally {
    yield put(actions.deleteCategoryEnd());
  }
}

function* watchGetCategory() {
  yield takeEvery(FETCH_REQUEST.GET, getCategorySaga);
}

function* watchDeleteCategory() {
  yield takeLatest(FETCH_REQUEST.DELETE, deleteCategorySaga);
}

// eslint-disable-next-line
export default function* root() {
  const sagas = [
    watchGetCategory,
    watchDeleteCategory
  ];

  yield sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
        } catch (e) {
          console.log({e})
        }
      }
    })
  )
}
