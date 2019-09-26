import { PRODUCT } from '../actions/types';

const { FETCH_REQUEST, FETCH_FAILURE, FETCH_SUCCESS, FETCH_END } = PRODUCT;

const initState = {
  msg: null,
  error: null,
  isLoading: false,
  rows: [],
  count: 0
};

// eslint-disable-next-line
export default function(state = initState, { type, payload, error }) {
  switch (type) {
    case FETCH_REQUEST.GET:
      return {
        ...state,
        isLoading: true
      };

    case  FETCH_SUCCESS.GET:
      return {
        ...state,
        rows: payload.rows,
        count: payload.count,
        isLoading: false
      };

    case  FETCH_FAILURE.GET:
      return {
        ...state,
        error,
        msg: error.message,
        isLoading: false
      };

    case FETCH_END.GET:
      return {
        ...state,
        error: null,
        msg: null
      };

    case FETCH_REQUEST.DELETE:
      return {
        ...state,
        isLoading: true
      };

    case  FETCH_SUCCESS.DELETE:
      return {
        ...state,
        rows: payload.rows,
        count: payload.count,
        isLoading: false
      };

    case  FETCH_FAILURE.DELETE:
      return {
        ...state,
        error,
        msg: error.message,
        isLoading: false
      };

    case FETCH_END.DELETE:
      return {
        ...state,
        error: null,
        msg: null
      };

    default:
      return state;
  }
}
