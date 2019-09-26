import { PRODUCT } from './types';

const { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_END } = PRODUCT.PHOTO;

export const postProductImgReq = (form, id ) => ({
  type: FETCH_REQUEST.POST,
  payload: { form, id }
});

export const postProductImgSuc = () => ({
  type: FETCH_SUCCESS.POST,
});

export const postProductImgFail = error => ({
  type: FETCH_FAILURE.POST,
  error
});

export const postProductImgEnd = () => ({
  type: FETCH_END.POST,
});

export const deleteProductImgReq = (rows) => ({
  type: FETCH_REQUEST.DELETE,
  payload: rows
});

export const deleteProductImgSuc = () => ({
  type: FETCH_SUCCESS.DELETE
});

export const deleteProductImgFail = error => ({
  type: FETCH_FAILURE.DELETE,
  error
});

export const deleteProductImgEnd = () => ({
  type: FETCH_END.DELETE
});
