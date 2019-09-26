import { PRODUCT } from '../actions/types';

const { FETCH_REQUEST, FETCH_FAILURE, FETCH_SUCCESS, FETCH_END, PHOTO } = PRODUCT;

const initState = {
  msg: null,
  error: null,
  isLoading: false,
  form: {},
};

// eslint-disable-next-line
export default function(state = initState, { type, payload, error }) {

  switch (type) {
    case FETCH_REQUEST.GET_ONE:
      return {
        ...state,
        isLoading: true
      };

    case  FETCH_SUCCESS.GET_ONE:
      return {
        ...state,
        form: {
          ...payload
        },
        isLoading: false
      };

    case  FETCH_FAILURE.GET_ONE:
      return {
        ...state,
        error,
        msg: error.message,
        isLoading: false
      };

    case FETCH_END.GET_ONE:
      return {
        ...state,
        error: null,
        msg: null
      };

    case FETCH_REQUEST.PUT:
      return {
        ...state,
        isLoading: true,
      };

    case  FETCH_SUCCESS.PUT:
      return {
        ...state,
        form: {
          ...payload
        },
        isLoading: false,
      };

    case  FETCH_FAILURE.PUT:
      return {
        ...state,
        error,
        msg: error.message,
        isLoading: false
      };

    case FETCH_END.PUT:
      return {
        ...state,
        error: null,
        msg: null,
        form: {},
      };

    case PHOTO.FETCH_REQUEST.POST:
    case PHOTO.FETCH_REQUEST.DELETE:
      return {
        ...state,
        isLoading: true,
      };

    case PHOTO.FETCH_SUCCESS.POST:
    case PHOTO.FETCH_SUCCESS.DELETE:
      return {
        ...state,
        isLoading: false,
      };

    case PHOTO.FETCH_FAILURE.POST:
    case PHOTO.FETCH_FAILURE.DELETE:
      return {
        ...state,
        error,
        msg: error.message,
        isLoading: false,
      };

    case PHOTO.FETCH_END.POST:
    case PHOTO.FETCH_END.DELETE:
      return {
        ...state,
        error: null,
        msg: null,
      };

    default:
      return state;
  }
}
