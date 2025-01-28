import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  quantity: 0, // Keeping track of quantity
};

const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload);
      state.quantity += 1; // Increase quantity when an item is added
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (product) => product.id !== action.payload
      );
      state.cart = updatedCart;
      state.quantity = updatedCart.length; // Update quantity after removing an item
    },
  },
});

export const { addCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
