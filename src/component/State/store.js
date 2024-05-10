import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import realEstateReducer from "./RealEstate/Reducer";
import propertyItemReducer from "./Property/Reducer";
import cartReducer from "./Cart/reducer";
import { orderReducer } from "./Key/Reducer";
import { featureReducer } from "./Features/Reducer";
import realEstateOrderReducer from "./Real Estate Order/Reducer";

const rooteReducer = combineReducers({
  auth: authReducer,
  realEstate: realEstateReducer,
  property: propertyItemReducer,
  cart: cartReducer,
  order: orderReducer,
  realEstateOrder: realEstateOrderReducer,
  features: featureReducer,
});

export const store = legacy_createStore(rooteReducer, applyMiddleware(thunk));
