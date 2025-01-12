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
    }
  }
})

export const { addCart } = cartSlice.actions
export default cartSlice.reducer;