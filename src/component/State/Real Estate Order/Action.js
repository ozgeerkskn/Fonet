import { api } from "../../config/api";

import {
  GET_REAL_ESTATES_KEY_FAILURE,
  GET_REAL_ESTATES_KEY_REQUEST,
  GET_REAL_ESTATES_KEY_SUCCESS,
  UPDATE_KEY_STATUS_FAILURE,
  UPDATE_KEY_STATUS_REQUEST,
  UPDATE_KEY_STATUS_SUCCESS,
} from "./ActionType";

export const updateOrderStatus = ({ orderId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_KEY_STATUS_REQUEST });
    try {
      const response = await api.put(
        `/api/admin/order/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      const updatedOrder = response.data;
      console.log("updated keys", updatedOrder);
      dispatch({ type: UPDATE_KEY_STATUS_SUCCESS, payload: updatedOrder });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: UPDATE_KEY_STATUS_FAILURE, payload: error });
    }
  };
};

export const fetchRealEstatesOrder = ({ realEstateId, orderStatus, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_REAL_ESTATES_KEY_REQUEST });
    try {
      const { data } = await api.get(
        `/api/admin/order/realEstate${realEstateId}`,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      const orders = data;
      console.log("real estates keys--------", orders);
      dispatch({ type: GET_REAL_ESTATES_KEY_SUCCESS, payload: orders });
    } catch (error) {
      dispatch({ type: GET_REAL_ESTATES_KEY_FAILURE, payload: error });
    }
  };
};
