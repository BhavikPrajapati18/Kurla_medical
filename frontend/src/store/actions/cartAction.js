import axios from "axios";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ONE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant.js";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  const product = data.data;

  console.log("API response data of cart:", data);
  console.log("Product inside cartAction:", product);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.images,
      stock: product.stock,
      category: product.category,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeOneItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ONE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
