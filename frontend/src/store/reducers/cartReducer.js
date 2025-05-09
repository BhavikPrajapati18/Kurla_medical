import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ONE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant.js";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: [] },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const itemExist = state.cartItems.find((i) => i.product === item.product);

      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === itemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_ONE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems
          .map((i) =>
            i.product === action.payload
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0), // Remove item if quantity becomes 0
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
