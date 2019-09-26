import { PRODUCT } from './types';

const { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_END } = PRODUCT;

export const getProductReq = search => ({
  type: FETCH_REQUEST.GET_ONE,
  payload: search
});

export const getProductSuc = form => ({
  type: FETCH_SUCCESS.GET_ONE,
  payload: form
});

export const getProductFail = error => ({
  type: FETCH_FAILURE.GET_ONE,
  error
});

export const getProductEnd = () => ({
  type: FETCH_END.GET_ONE,
});

export const putProductReq = (form) => ({
  type: FETCH_REQUEST.PUT,
  payload: form
});

export const putProductSuc = () => ({
  type: FETCH_SUCCESS.PUT,
});

export const putProductFail = error => ({
  type: FETCH_FAILURE.PUT,
  error
});

export const putProductEnd = () => ({
  type: FETCH_END.PUT,
});

export const getProductsReq = search => ({
  type: FETCH_REQUEST.GET,
  payload: search
});

export const getProductsSuc = data => ({
  type: FETCH_SUCCESS.GET,
  payload: data
});

export const getProductsFail = error => ({
  type: FETCH_FAILURE.GET,
  error
});

export const getProductsEnd = () => ({
  type: FETCH_END.GET,
});

export const deleteProductReq = (categoryName, query) => ({
  type: FETCH_REQUEST.DELETE,
  payload: {
    name: categoryName,
    query
  }
});

export const deleteProductSuc = data => ({
  type: FETCH_SUCCESS.DELETE,
  payload: data
});

export const deleteProductFail = error => ({
  type: FETCH_FAILURE.DELETE,
  error
});

export const deleteProductEnd = () => ({
  type: FETCH_END.DELETE
});
