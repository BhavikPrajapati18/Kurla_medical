import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart : [],
  quantity : 0,
}

const cartSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    addCart : (state , action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(product => product.id !== action.payload);
    },
  }
  
})

export const { addCart , removeFromCart } = cartSlice.actions
export default cartSlice.reducer;