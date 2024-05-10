import { api } from "../../config/api";
import {
  CREATE_FEATURE_CATEGORY_SUCCESS,
  CREATE_FEATURE_SUCCESS,
  GET_FEATURES,
  GET_FEATURE_CATEGORY_SUCCESS,
  UPDATE_STOCK,
} from "./ActionType";

export const getFeaturesOfRealEstate = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/features/realEstate/${id}`, {
        headers: {
          Authorization: `Bearer  ${jwt}`,
        },
      });
      console.log("get all features", response.data);
      dispatch({ type: GET_FEATURES, payload: response.data });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const createFeature = ({ data, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/features`, data, {
        headers: {
          Authorization: `Bearer  ${jwt}`,
        },
      });
      console.log("create features", response.data);
      dispatch({ type: CREATE_FEATURE_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const createFeatureCategory = ({ data, jwt }) => {
  console.log("data", data, "jwt", jwt);
  return async (dispatch) => {
    try {
      const response = await api.post(`/api/admin/features/category`, data, {
        headers: {
          Authorization: `Bearer  ${jwt}`,
        },
      });
      console.log("create features category", response.data);
      dispatch({
        type: CREATE_FEATURE_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const getFeatureCategory = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        `/api/admin/features/realEstate/${id}/category`,
        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("get features category", response.data);
      dispatch({
        type: GET_FEATURE_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const updateStockOfFeature = ({ id, jwt }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.put(`/api/admin/features/${id}/stoke`, {
        headers: {
          Authorization: `Bearer  ${jwt}`,
        },
      });

      dispatch({
        type: UPDATE_STOCK,
        payload: data,
      });
      console.log("update features stock", data);
    } catch (error) {
      console.log("error", error);
    }
  };
};
