import { api } from "../../config/api";

import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_REAL_ESTATE_FAILURE,
  CREATE_REAL_ESTATE_REQUEST,
  CREATE_REAL_ESTATE_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_REAL_ESTATE_FAILURE,
  DELETE_REAL_ESTATE_REQUEST,
  DELETE_REAL_ESTATE_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_REAL_ESTATES_FAILURE,
  GET_ALL_REAL_ESTATES_REQUEST,
  GET_ALL_REAL_ESTATES_SUCCESS,
  GET_REAL_ESTATE_BY_ID_FAILURE,
  GET_REAL_ESTATE_BY_ID_REQUEST,
  GET_REAL_ESTATE_BY_ID_SUCCESS,
  GET_REAL_ESTATE_BY_USER_ID_FAILURE,
  GET_REAL_ESTATE_BY_USER_ID_REQUEST,
  GET_REAL_ESTATE_BY_USER_ID_SUCCESS,
  GET_REAL_ESTATE_CATEGORY_FAILURE,
  GET_REAL_ESTATE_CATEGORY_REQUEST,
  GET_REAL_ESTATE_CATEGORY_SUCCESS,
  GET_REAL_ESTATE_EVENTS_FAILURE,
  GET_REAL_ESTATE_EVENTS_REQUEST,
  GET_REAL_ESTATE_EVENTS_SUCCESS,
  UPDATE_REAL_ESTATE_FAILURE,
  UPDATE_REAL_ESTATE_REQUEST,
  UPDATE_REAL_ESTATE_STATUS_FAILURE,
  UPDATE_REAL_ESTATE_STATUS_REQUEST,
  UPDATE_REAL_ESTATE_STATUS_SUCCESS,
  UPDATE_REAL_ESTATE_SUCCESS,
} from "./ActionTypes";

export const getAllRealEstatesAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_REAL_ESTATES_REQUEST });
    try {
      const { data } = await api.get("/api/realEstates", {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      });
      dispatch({ type: GET_ALL_REAL_ESTATES_SUCCESS, payload: data });
      console.log("All real estates", data);
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: GET_ALL_REAL_ESTATES_FAILURE, payload: error });
    }
  };
};

export const getRealEstateById = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_REAL_ESTATE_BY_ID_REQUEST });
    try {
      const response = await api.get(
        `/api/realEstates/${reqData.realEstateId}`,
        {
          headers: {
            Authorization: `Bearer  ${reqData.jwt}`,
          },
        }
      );
      dispatch({ type: GET_REAL_ESTATE_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: GET_REAL_ESTATE_BY_ID_FAILURE, payload: error });
    }
  };
};

export const getRealEstateByUserId = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_REAL_ESTATE_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/realEstates/user`, {
        headers: {
          Authorization: `Bearer  ${jwt}`,
        },
      });
      console.log("Get real estate by user id", data);
      dispatch({ type: GET_REAL_ESTATE_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: GET_REAL_ESTATE_BY_USER_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createRealEstate = (reqData) => {
  console.log("token--------------", reqData.token);
  return async (dispatch) => {
    dispatch({ type: CREATE_REAL_ESTATE_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/realEstates`, reqData.data, {
        headers: {
          Authorization: `Bearer  ${reqData.token}`,
        },
      });

      dispatch({ type: CREATE_REAL_ESTATE_SUCCESS, payload: data });
      console.log("Created real estate", data);
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: CREATE_REAL_ESTATE_FAILURE,
        payload: error,
      });
    }
  };
};

export const updateRealEstate = ({ realEstateId, realEstateData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_REAL_ESTATE_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/realEstate/${realEstateId}`,
        realEstateData,
        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );

      dispatch({
        type: UPDATE_REAL_ESTATE_SUCCESS,
        payload: res.payload,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_REAL_ESTATE_FAILURE,
        payload: error,
      });
    }
  };
};

export const deleteRealEstate = ({ realEstateId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_REAL_ESTATE_REQUEST });
    try {
      const res = await api.delete(
        `/api/admin/realEstate/${realEstateId}`,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("Delete real estate", res.data);
      dispatch({
        type: DELETE_REAL_ESTATE_SUCCESS,
        payload: realEstateId,
      });
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: DELETE_REAL_ESTATE_FAILURE,
        payload: error,
      });
    }
  };
};

export const updateRealEstateStatus = ({ realEstateId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_REAL_ESTATE_STATUS_REQUEST });
    try {
      const res = await api.put(
        `/api/admin/realEstate/${realEstateId}/status`,
        {},

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("ress", res.data);
      dispatch({
        type: UPDATE_REAL_ESTATE_STATUS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: UPDATE_REAL_ESTATE_STATUS_FAILURE,
        payload: error,
      });
    }
  };
};

export const createEventAction = ({ data, jwt, realEstateId }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });
    try {
      const res = await api.post(
        `/api/admin/events/realEstate/${realEstateId}`,
        data,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("create events", res.data);
      dispatch({
        type: CREATE_EVENTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("catch -", error);
      dispatch({
        type: CREATE_EVENTS_FAILURE,
        payload: error,
      });
    }
  };
};

export const getAllEvents = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    try {
      const res = await api.get(
        `/api/events`,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("get all events", res.data);
      dispatch({
        type: GET_ALL_EVENTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("catch -", error);
      dispatch({
        type: GET_ALL_EVENTS_FAILURE,
        payload: error,
      });
    }
  };
};

export const deleteEventAction = ({ eventId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });
    try {
      const res = await api.delete(
        `/api/admin/events/${eventId}`,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("Delete events", res.data);
      dispatch({
        type: DELETE_EVENTS_SUCCESS,
        payload: eventId,
      });
    } catch (error) {
      console.log("catch -", error);
      dispatch({
        type: DELETE_EVENTS_FAILURE,
        payload: error,
      });
    }
  };
};

export const getRealEstatesEvents = ({ realEstateId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_REAL_ESTATE_EVENTS_REQUEST });
    try {
      const res = await api.get(
        `/api/admin/events/realEstate/${realEstateId}`,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("get real estates events", res.data);
      dispatch({
        type: GET_REAL_ESTATE_EVENTS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("catch -", error);
      dispatch({
        type: GET_REAL_ESTATE_EVENTS_FAILURE,
        payload: error,
      });
    }
  };
};

export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const res = await api.post(
        `/api/admin/category`,
        reqData,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("create category", res.data);
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("catch -", error);
      dispatch({
        type: CREATE_CATEGORY_FAILURE,
        payload: error,
      });
    }
  };
};

export const getRealEstatesCategory = ({ jwt, realEstateId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_REAL_ESTATE_CATEGORY_REQUEST });
    try {
      const res = await api.get(
        `/api/category/realEstate/${realEstateId}`,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("get real estate category", res.data);
      dispatch({
        type: GET_REAL_ESTATE_CATEGORY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log("catch -", error);
      dispatch({
        type: GET_REAL_ESTATE_CATEGORY_FAILURE,
        payload: error,
      });
    }
  };
};
