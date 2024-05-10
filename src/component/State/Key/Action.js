import { api } from "../../config/api";
import {
  CREATE_KEY_FAILURE,
  CREATE_KEY_REQUEST,
  CREATE_KEY_SUCCESS,
  GET_USERS_KEYS_FAILURE,
  GET_USERS_KEYS_REQUEST,
  GET_USERS_KEYS_SUCCESS,
} from "./ActionTypes";

export const createKey = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_KEY_REQUEST });
    try {
      const { data } = await api.post(
        `/api/order`,
        reqData.order,

        {
          headers: {
            Authorization: `Bearer  ${reqData.jwt}`,
          },
        }
      );
      //   if (data.payment_url) {
      //     window.location.href = data.payment_url;
      //   }
      console.log("Created key data", data);

      dispatch({
        type: CREATE_KEY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: CREATE_KEY_FAILURE,
        payload: error,
      });
    }
  };
};

export const getUsersKeys = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_KEYS_REQUEST });
    try {
      const { data } = await api.get(`/api/order/user`, {
        headers: {
          Authorization: `Bearer  ${jwt}`,
        },
      });

      console.log("users order", data);

      dispatch({
        type: GET_USERS_KEYS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_KEYS_FAILURE,
        payload: error,
      });
    }
  };
};

// export const getUsersNotificationAction = () => {
//   return async (dispatch) => {
//     dispatch({ type: GET_USERS_NOTIFICATION_REQUEST });
//     try {
//       const { data } = await api.get(
//         `/api/notification`);

//       console.log("all notifications", data);

//       dispatch({
//         type: GET_USERS_NOTIFICATION_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       console.log("error", error);
//       dispatch({
//         type: GET_USERS_NOTIFICATION_FAILURE,
//         payload: error,
//       });
//     }
//   };
// };
