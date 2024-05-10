import * as actionTypes from "./ActionType";

const initialState = {
  propertyItems: [],
  loading: false,
  error: null,
  search: [],
  message: null,
};

const propertyItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PROPERTY_ITEM_REQUEST:
    case actionTypes.GET_PROPERTY_ITEMS_BY_REAL_ESTATE_ID_REQUEST:
    case actionTypes.DELETE_PROPERTY_ITEM_REQUEST:
    case actionTypes.SEARCH_PROPERTY_ITEM_REQUEST:
    case actionTypes.UPDATE_PROPERTY_ITEMS_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case actionTypes.CREATE_PROPERTY_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        propertyItems: [...state.propertyItems, action.payload],
        message: "Property Created Successfully",
      };
    case actionTypes.GET_PROPERTY_ITEMS_BY_REAL_ESTATE_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        propertyItems: action.payload,
      };
    case actionTypes.DELETE_PROPERTY_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        propertyItems: state.propertyItems.filter(
          (propertyItem) => propertyItem.id !== action.payload
        ),
      };
    case actionTypes.UPDATE_PROPERTY_ITEMS_AVAILABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        propertyItems: state.propertyItems.map((propertyItem) =>
          propertyItem.id === action.payload.id ? action.payload : propertyItem
        ),
      };
    case actionTypes.SEARCH_PROPERTY_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        search: action.payload,
      };
    case actionTypes.CREATE_PROPERTY_ITEM_FAILURE:
    case actionTypes.GET_PROPERTY_ITEMS_BY_REAL_ESTATE_ID_FAILURE:
    case actionTypes.DELETE_PROPERTY_ITEM_FAILURE:
    case actionTypes.SEARCH_PROPERTY_ITEM_FAILURE:
    case actionTypes.UPDATE_PROPERTY_ITEMS_AVAILABILITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: null,
      };
    default:
      return state;
  }
};

export default propertyItemReducer;
