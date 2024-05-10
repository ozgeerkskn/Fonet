import * as actionTypes from "./ActionTypes";

const initialState = {
  realEstates: [],
  usersRealEstate: null,
  realEstate: null,
  loading: false,
  error: null,
  events: [],
  realEstatesEvents: [],
  categories: [],
};

const realEstateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_REAL_ESTATE_REQUEST:
    case actionTypes.GET_ALL_REAL_ESTATES_REQUEST:
    case actionTypes.DELETE_REAL_ESTATE_REQUEST:
    case actionTypes.UPDATE_REAL_ESTATE_REQUEST:
    case actionTypes.GET_REAL_ESTATE_BY_ID_REQUEST:
    case actionTypes.CREATE_CATEGORY_REQUEST:
    case actionTypes.GET_REAL_ESTATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_REAL_ESTATE_SUCCESS:
      return {
        ...state,
        loading: false,
        usersRealEstate: action.payload,
      };
    case actionTypes.GET_ALL_REAL_ESTATES_SUCCESS:
      return {
        ...state,
        loading: false,
        realEstates: action.payload,
      };
    case actionTypes.GET_REAL_ESTATE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        realEstate: action.payload,
      };
    case actionTypes.GET_REAL_ESTATE_BY_USER_ID_SUCCESS:
    case actionTypes.UPDATE_REAL_ESTATE_STATUS_SUCCESS:
    case actionTypes.UPDATE_REAL_ESTATE_SUCCESS:
      return {
        ...state,
        loading: false,
        usersRealEstate: action.payload,
      };
    case actionTypes.DELETE_REAL_ESTATE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        realEstates: state.realEstates.filter(
          (item) => item.id !== action.payload
        ),
        usersRealEstate: state.usersRealEstate.filter(
          (item) => item.id !== action.payload
        ),
      };

    case actionTypes.CREATE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        realEstatesEvents: [...state.realEstatesEvents, action.payload],
      };
    case actionTypes.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case actionTypes.GET_REAL_ESTATE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        realEstatesEvents: action.payload,
      };
    case actionTypes.DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((item) => item.id !== action.payload),
        realEstatesEvents: state.realEstatesEvents.filter(
          (item) => item.id !== action.payload
        ),
      };
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };
    case actionTypes.GET_REAL_ESTATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case actionTypes.CREATE_REAL_ESTATE_FAILURE:
    case actionTypes.GET_ALL_REAL_ESTATES_FAILURE:
    case actionTypes.DELETE_REAL_ESTATE_FAILURE:
    case actionTypes.UPDATE_REAL_ESTATE_FAILURE:
    case actionTypes.GET_REAL_ESTATE_BY_ID_FAILURE:
    case actionTypes.CREATE_EVENTS_FAILURE:
    case actionTypes.CREATE_CATEGORY_FAILURE:
    case actionTypes.GET_REAL_ESTATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default realEstateReducer;
