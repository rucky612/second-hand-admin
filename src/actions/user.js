import { USER } from './types';

const { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE, FETCH_END } =USER;

export const getUsersReq = search => ({
  type: FETCH_REQUEST.GET,
  payload: search
});

export const getUsersSuc = data => ({
  type: FETCH_SUCCESS.GET,
  payload: data
});

export const getUsersFail = error => ({
  type: FETCH_FAILURE.GET,
  error
});

export const getUsersEnd = () => ({
  type: FETCH_END.GET,
});

export const putUserReq = (user, query) => ({
  type: FETCH_REQUEST.PUT,
  payload: { user, query }
});

export const putUserSuc = data => ({
  type: FETCH_SUCCESS.PUT,
  payload: data
});

export const putUserFail = error => ({
  type: FETCH_FAILURE.PUT,
  error
});

export const putUserEnd = () => ({
  type: FETCH_END.PUT
});
