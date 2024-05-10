import {
  GET_USERS_KEYS_FAILURE,
  GET_USERS_KEYS_REQUEST,
  GET_USERS_KEYS_SUCCESS,
} from "./ActionTypes";

const initialState = {
  loading: false,
  order: [],
  error: null,
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_KEYS_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_USERS_KEYS_SUCCESS:
      return { ...state, error: null, loading: false, orders: payload };

    case GET_USERS_KEYS_FAILURE:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
