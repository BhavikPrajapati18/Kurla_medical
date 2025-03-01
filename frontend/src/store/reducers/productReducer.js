import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/productConstant.js";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_PRODUCT_SUCCESS:
      console.log("Reducer Products : ", action.payload);
      return {
        ...state,
        loading: false,
        products: action.payload || [],
        productsCount: action.payload.productsCount,
      };
    case ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      console.log("Reducer product details : ", action.payload.product);
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
