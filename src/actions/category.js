import { CATEGORY } from "./types";

const { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_END }  = CATEGORY;

export const getCategoryReq = search => ({
  type: FETCH_REQUEST.GET,
  payload: search
});

export const getCategorySuc = data => ({
  type: FETCH_SUCCESS.GET,
  payload: data
});

export const getCategoryFail = error => ({
  type: FETCH_FAILURE.GET,
  error
});

export const getCategoryEnd = () => ({
  type: FETCH_END.GET,
});

export const deleteCategoryReq = (categoryName, query) => ({
  type: FETCH_REQUEST.DELETE,
  payload: {
    name: categoryName,
    query
  }
});

export const deleteCategorySuc = data => ({
  type: FETCH_SUCCESS.DELETE,
  payload: data
});

export const deleteCategoryFail = error => ({
  type: FETCH_FAILURE.DELETE,
  error
});

export const deleteCategoryEnd = () => ({
  type: FETCH_END.DELETE
});