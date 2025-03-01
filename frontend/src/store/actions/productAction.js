import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstant.js";

export const getProduts = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });

    const { data } = await axios.get("/api/v1/products");
    console.log(" getProduts data fething fron api by axios:  ", data);

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProdutDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/products/${id}`);
    console.log(" getProdutDetails data fething fron api by axios:  ", data);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
