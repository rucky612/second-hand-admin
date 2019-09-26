import axios from 'axios';
import { put, takeLatest, call, spawn } from 'redux-saga/effects';
import { PRODUCT } from '../actions/types';
import { URL } from '../constants/config';
import { history } from '../index';
import * as actions from "../actions/product-image";
import errHandler from "../utils/error-message"
import routeURL from '../constants/route-urls';

const { FETCH_REQUEST } = PRODUCT.PHOTO;

function* postProductImgSaga({ payload }) {
  const { form, id } = payload;
  try {
    const data= new FormData();
    form.forEach(file => {
      data.append('photo', file.originFileObj);
    });
    yield call(axios.post,`${URL}/product/photo`, data, {
      params: { id }
    });
    yield put(actions.postProductImgSuc());
    history.push(routeURL.PRODUCT);
  } catch (e) {
    yield call(errHandler, e);
    yield put(actions.postProductImgFail(e));
  } finally {
    yield put(actions.postProductImgEnd());
  }
}

function* deleteProductImgSaga({ payload: rows }) {
  try {
    yield call(axios.delete, `${URL}/product/photo`, {
      data: { rows }
    });
    yield put(actions.deleteProductImgSuc());
    yield call(history.push, routeURL.PRODUCT);
  } catch (e) {
    yield call(errHandler, e);
    yield put(actions.deleteProductImgFail(e));
  } finally {
    yield put(actions.deleteProductImgEnd());
  }
}

function* watchPostProductImg() {
  yield takeLatest(FETCH_REQUEST.POST, postProductImgSaga);
}

function* watchDeleteProductImg() {
  yield takeLatest(FETCH_REQUEST.DELETE, deleteProductImgSaga);
}

// eslint-disable-next-line
export default function* root() {
  const sagas = [
    watchPostProductImg,
    watchDeleteProductImg
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
