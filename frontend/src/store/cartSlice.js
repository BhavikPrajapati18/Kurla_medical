import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        // Agar item already cart me hai, toh uski quantity badhao
        state.cart[itemIndex].quantity += action.payload.quantity;
      } else {
        // Nahi hai toh naya item daalo
        state.cart.push(action.payload);
      }

      state.quantity += 1;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload
      );

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item._id !== action.payload);
      }

      state.quantity -= 1;
    },
  },
});

export const { addCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
