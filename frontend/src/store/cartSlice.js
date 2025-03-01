import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload);
      state.quantity += 1;
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (product) => product.id !== action.payload
      );
      state.cart = updatedCart;
      state.quantity = updatedCart.length;
    },
  },
});

export const { addCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
