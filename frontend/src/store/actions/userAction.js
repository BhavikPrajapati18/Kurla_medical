import { TypeOutline } from "lucide-react";
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  CLEAR_ERRORS,
} from "../constants/userConstant.js";

import axios from "axios";

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/users/login",
      { email, password },
      config
    );
    console.log(data);
    localStorage.setItem("token", data.data.accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.data,
    });
    console.log("token", data.data.accessToken);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Register user
export const RegisterUser = (userdata) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/users/register",
      userdata,
      config
    );
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const load = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.get("/api/v1/users/current-user");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// LOGOUT USER
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/users/logout");

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Profile
export const updateProfile = (userdata) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put("/api/v1/users/update", userdata, config);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Password
export const updatePassword =
  (oldpassword, newpassword) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PASSWORD_REQUEST,
      });

      const token = localStorage.getItem("token");
      console.log(token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        "/api/v1/users/change-password",
        { oldpassword, newpassword },
        config
      );
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
