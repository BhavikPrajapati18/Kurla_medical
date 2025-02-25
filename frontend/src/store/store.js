import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";

const initialState = {};

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: cartSlice,
  },
});

export default store;
