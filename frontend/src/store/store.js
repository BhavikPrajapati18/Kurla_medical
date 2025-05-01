import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducer.js";
import { profileReducer, userReducer } from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
});

export default store;
