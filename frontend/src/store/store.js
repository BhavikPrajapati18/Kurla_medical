import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducer.js";
import authSlice from "./authSlice.js";
import { userReducer } from "./reducers/userReducer.js";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  auth: authSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

export default store;
