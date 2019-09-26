import axios from 'axios';
import { put, takeEvery, call, spawn } from 'redux-saga/effects';
import { ORDER } from '../actions/types';
import { URL } from '../constants/config';
import * as actions from "../actions/order";
import errHandler from "../utils/error-message"

const { FETCH_REQUEST } = ORDER;

function* getOrdersSaga({ payload }) {
  try {
    const res = yield call(axios.get, `${URL}/order`, {
      params : {
        ...payload
      }
    });
    yield put(actions.getOrdersSuc(res.data));
  } catch (e) {
    yield call(errHandler, e);
    yield put(actions.getOrdersFail(e));
  } finally {
    yield put(actions.getOrdersEnd());
  }
}

function* putOrderSaga({ payload }) {
  const { user, query } = payload;
  try {
    yield call(axios.put,`${URL}/order`, user);
    const res = yield call(axios.get, `${URL}/order`, {
      params : {
        ...query
      }
    });
    yield put(actions.putOrderSuc(res.data));
  } catch (e) {
    yield call(errHandler, e);
    yield put(actions.putOrderFail(e));
  } finally {
    yield put(actions.putOrderEnd());
  }
}

function* watchGetOrders() {
  yield takeEvery(FETCH_REQUEST.GET, getOrdersSaga);
}

function* watchPutOrder() {
  yield takeEvery(FETCH_REQUEST.PUT, putOrderSaga);
}

// eslint-disable-next-line
export default function* root() {
  const sagas = [
    watchGetOrders,
    watchPutOrder,
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
