import axios from 'axios';
import { put, takeEvery, call, spawn } from 'redux-saga/effects';
import { USER } from '../actions/types';
import { URL } from '../constants/config';
import * as actions from "../actions/user";
import errHandler from "../utils/error-message"

const { FETCH_REQUEST } = USER;

function* getUsersSaga({ payload }) {
  try {
    const res = yield call(axios.get, `${URL}/users`, {
      params : {
        ...payload
      }
    });
    yield put(actions.getUsersSuc(res.data));
  } catch (e) {
    yield call(errHandler, e);
    yield put(actions.getUsersFail(e));
  } finally {
    yield put(actions.getUsersEnd());
  }
}

function* putUserSaga({ payload }) {
  const { user, query } = payload;
  try {
    yield call(axios.put,`${URL}/users`, user);
    const res = yield call(axios.get, `${URL}/users`, {
      params : {
        ...query
      }
    });
    yield put(actions.putUserSuc(res.data));
  } catch (e) {
    yield call(errHandler, e);
    yield put(actions.putUserFail(e));
  } finally {
    yield put(actions.putUserEnd());
  }
}

function* watchGetUsers() {
  yield takeEvery(FETCH_REQUEST.GET, getUsersSaga);
}

function* watchPutUser() {
  yield takeEvery(FETCH_REQUEST.PUT, putUserSaga);
}

// eslint-disable-next-line
export default function* root() {
  const sagas = [
    watchGetUsers,
    watchPutUser,
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
