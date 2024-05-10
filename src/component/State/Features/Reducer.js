import {
  CREATE_FEATURE_CATEGORY_SUCCESS,
  CREATE_FEATURE_SUCCESS,
  GET_FEATURES,
  GET_FEATURE_CATEGORY_SUCCESS,
  UPDATE_STOCK,
} from "./ActionType";

const initialState = {
  features: [],
  update: null,
  category: [],
};

export const featureReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEATURES:
      return {
        ...state,
        features: action.payload,
      };
    case GET_FEATURE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };

    case CREATE_FEATURE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case CREATE_FEATURE_SUCCESS:
      return {
        ...state,
        features: [...state.features, action.payload],
      };

    case UPDATE_STOCK:
      return {
        ...state,
        update: action.payload,
        features: state.features.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    default:
      return state;
  }
};
