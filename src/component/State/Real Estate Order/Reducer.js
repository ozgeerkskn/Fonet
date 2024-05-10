import {
  GET_REAL_ESTATES_KEY_FAILURE,
  GET_REAL_ESTATES_KEY_REQUEST,
  GET_REAL_ESTATES_KEY_SUCCESS,
  UPDATE_KEY_STATUS_FAILURE,
  UPDATE_KEY_STATUS_REQUEST,
  UPDATE_KEY_STATUS_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  orders: [],
};

const realEstateOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REAL_ESTATES_KEY_REQUEST:
    case UPDATE_KEY_STATUS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_REAL_ESTATES_KEY_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case UPDATE_KEY_STATUS_SUCCESS:
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.id ? action.payload : order
      );
      return { ...state, loading: false, orders: updatedOrders };
    case GET_REAL_ESTATES_KEY_FAILURE:
    case UPDATE_KEY_STATUS_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default realEstateOrderReducer;
