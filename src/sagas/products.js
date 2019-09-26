import axios from 'axios';
import { put, takeEvery, takeLatest, call, spawn } from 'redux-saga/effects';
import { PRODUCT } from '../actions/types';
import { URL } from '../constants/config';
import { history } from '../index';
import * as actions from "../actions/product";
import errHandler from "../utils/error-message"
import routeURL from '../constants/route-urls';

const { FETCH_REQUEST } = PRODUCT;

function* getProductSaga({ payload }) {
  try {
    const res = yield call(axios.get, `${URL}/product`, {
      params : {
        ...payload
      }
    });
    yield put(actions.getProductSuc(res.data[0]));
  } catch (e) {
    yield call(errHandler, e);
    yield put(actions.getProductFail(e));
  } finally {
    yield put(actions.getProductEnd());
  }
}

function* putProductSaga({ payload }) {
  try {
    yield call(axios.put,`${URL}/product`, payload);
    yield put(actions.putProductSuc());
    yield call(history.push, routeURL.PRODUCT)
  } catch (e) {
    yield call(errHandler, e);
    yield put(actions.putProductFail(e));
  } finally {
    yield put(actions.putProductEnd());
  }
}

function* getProductsSaga({ payload }) {
  try {
    const res = yield call(axios.get, `${URL}/products`, {
      params : {
        ...payload,
      }
    });
    yield put(actions.getProductsSuc(res.data));
  } catch (e) {
    yield call(errHandler, e);
    yield put(actions.getProductsFail(e));
  } finally {
    yield put(actions.getProductsEnd());
  }
}

function* deleteProductSaga({ payload }) {
  const { name, query } = payload;
  try {
    yield call(axios.delete, `${URL}/product`, {
      data: { p_name: name }
    });
    const res = yield call(axios.get, `${URL}/products`, {
      params : {
        ...query
      }
    });
    yield put(actions.deleteProductSuc(res.data));
  } catch (e) {
    yield call(errHandler, e);
    yield put(actions.deleteProductFail(e));
  } finally {
    yield put(actions.deleteProductEnd());
  }
}

function* watchGetProduct() {
  yield takeEvery(FETCH_REQUEST.GET_ONE, getProductSaga);
}

function* watchPutProduct() {
  yield takeEvery(FETCH_REQUEST.PUT, putProductSaga);
}

function* watchGetProducts() {
  yield takeEvery(FETCH_REQUEST.GET, getProductsSaga);
}

function* watchDeleteProduct() {
  yield takeLatest(FETCH_REQUEST.DELETE, deleteProductSaga);
}

// eslint-disable-next-line
export default function* root() {
  const sagas = [
    watchGetProduct,
    watchPutProduct,
    watchGetProducts,
    watchDeleteProduct
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
