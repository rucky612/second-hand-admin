import { call, spawn } from 'redux-saga/effects';
import categorySaga from "./category"
import productSaga from "./products"
import productImgSaga from "./product-image"
import usersSaga from "./user"
import ordersSaga from "./order"

export default function* root() {
  const sagas = [
    categorySaga,
    productSaga,
    productImgSaga,
    usersSaga,
    ordersSaga
  ];

  yield sagas.map(saga =>
    spawn(function* () {
        try {
          yield call(saga)
        } catch (e) {
          console.log({e})
        }
    })
  )
}