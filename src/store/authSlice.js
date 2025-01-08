import { createSlice } from "@reduxjs/toolkit"

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
          userData = action.payload.userData
      } ,
      logout : ( state , action ) => {
        status.state = false,
        userData = null
      } ,
    }
  })

export const {login , logout} = authSlice.actions;

export default authSlice
