import { ORDER } from './types';

const { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_END } = ORDER;

export const getOrdersReq = search => ({
  type: FETCH_REQUEST.GET,
  payload: search
});

export const getOrdersSuc = data => ({
  type: FETCH_SUCCESS.GET,
  payload: data
});

export const getOrdersFail = error => ({
  type: FETCH_FAILURE.GET,
  error
});

export const getOrdersEnd = () => ({
  type: FETCH_END.GET,
});

export const putOrderReq = (user, query) => ({
  type: FETCH_REQUEST.PUT,
  payload: { user, query }
});

export const putOrderSuc = data => ({
  type: FETCH_SUCCESS.PUT,
  payload: data
});

export const putOrderFail = error => ({
  type: FETCH_FAILURE.PUT,
  error
});

export const putOrderEnd = () => ({
  type: FETCH_END.PUT
});
