import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { productReducer } from "./reducers/productReducer.js";
import authSlice from "./authSlice.js";

const reducer = combineReducers({
  products: productReducer,
  auth: authSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

export default store;
