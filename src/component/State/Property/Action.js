import { api } from "../../config/api";
import {
  CREATE_PROPERTY_ITEM_FAILURE,
  CREATE_PROPERTY_ITEM_REQUEST,
  CREATE_PROPERTY_ITEM_SUCCESS,
  DELETE_PROPERTY_ITEM_FAILURE,
  DELETE_PROPERTY_ITEM_REQUEST,
  DELETE_PROPERTY_ITEM_SUCCESS,
  GET_PROPERTY_ITEMS_BY_REAL_ESTATE_ID_FAILURE,
  GET_PROPERTY_ITEMS_BY_REAL_ESTATE_ID_REQUEST,
  GET_PROPERTY_ITEMS_BY_REAL_ESTATE_ID_SUCCESS,
  SEARCH_PROPERTY_ITEM_FAILURE,
  SEARCH_PROPERTY_ITEM_REQUEST,
  SEARCH_PROPERTY_ITEM_SUCCESS,
  UPDATE_PROPERTY_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_PROPERTY_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_PROPERTY_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

export const createPropertyItem = ({ property, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_PROPERTY_ITEM_REQUEST });
    try {
      const { data } = await api.post(
        `/api/admin/property`,
        property,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("created property", data);
      dispatch({
        type: CREATE_PROPERTY_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: CREATE_PROPERTY_ITEM_FAILURE,
        payload: error,
      });
    }
  };
};

export const getPropertyItemsByRealEstateId = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_PROPERTY_ITEMS_BY_REAL_ESTATE_ID_REQUEST });
    try {
      const { data } = await api.get(
        `/api/property/realEstate/${reqData.realEstateId}?rent=${reqData.rent}&nonrent=${reqData.nonrent}
          &sale=${reqData.sale}&property_category=${reqData.propertyCategory}`,

        {
          headers: {
            Authorization: `Bearer  ${reqData.jwt}`,
          },
        }
      );
      console.log("property item by real estates", data);
      dispatch({
        type: GET_PROPERTY_ITEMS_BY_REAL_ESTATE_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("catch error", error);
      dispatch({
        type: GET_PROPERTY_ITEMS_BY_REAL_ESTATE_ID_FAILURE,
        payload: error,
      });
    }
  };
};

export const searchPropertyItem = ({ keyword, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_PROPERTY_ITEM_REQUEST });
    try {
      const { data } = await api.get(
        `/api/property/search?name=${keyword}`,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("data --------", data);
      dispatch({
        type: SEARCH_PROPERTY_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_PROPERTY_ITEM_FAILURE,
        payload: error,
      });
    }
  };
};

//   export const getAllFeaturesOfPropertyItem = ({ reqData }) => {
//     return async (dispatch) => {
//       dispatch({ type: GET_ALL });
//       try {
//         const { data } = await api.get(
//           `/api/property/realEstate(${reqData.realEstateId})`,

//           {
//             headers: {
//               Authorization: `Bearer  ${reqData.jwt}`,
//             },
//           }
//         );
//         console.log("Property item by real estates", data);
//         dispatch({
//           type: SEARCH_PROPERTY_ITEM_SUCCESS,
//           payload: data,
//         });
//       } catch (error) {
//         dispatch({
//           type: SEARCH_PROPERTY_ITEM_FAILURE,
//           payload: error,
//         });
//       }
//     };
//   };

export const updatePropertyItemsAvailability = ({ propertyId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PROPERTY_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/property/${propertyId}`,
        {},

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("Update propertyItems Availability", data);
      dispatch({
        type: UPDATE_PROPERTY_ITEMS_AVAILABILITY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: UPDATE_PROPERTY_ITEMS_AVAILABILITY_FAILURE,
        payload: error,
      });
    }
  };
};

export const deletePropertyAction = ({ propertyId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_PROPERTY_ITEM_REQUEST });
    try {
      const { data } = await api.delete(
        `/api/admin/property/${propertyId}`,

        {
          headers: {
            Authorization: `Bearer  ${jwt}`,
          },
        }
      );
      console.log("delete property", data);
      dispatch({
        type: DELETE_PROPERTY_ITEM_SUCCESS,
        payload: propertyId,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PROPERTY_ITEM_FAILURE,
        payload: error,
      });
    }
  };
};
