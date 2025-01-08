import { createSlice } from "@reduxjs/toolkit"

function authSlice() {

  const initialState = {
    status : false,
    userData : null
  }

  const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
      login : ( state , action ) => {
          state.status = true,
          userData = action.payload.userData;
      } ,
      logout : ( state , action ) => {
        
      } ,
    }
  })

}

export default authSlice
