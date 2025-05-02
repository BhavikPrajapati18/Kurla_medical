import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemsFromCart,
  removeOneItemFromCart,
} from "../../store/actions/cartAction.js";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, quantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <ShoppingCart size={80} className="text-gray-400" />
        <h1 className="mt-4 text-3xl font-semibold text-gray-600">
          Your Cart is Empty
        </h1>
        <p className="mt-2 text-gray-500">Add products to continue shopping!</p>
        <button
          onClick={() => navigate("/store")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((product) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl shadow-md p-4"
              >
                <div className="flex justify-center items-center bg-gray-100 rounded-xl p-4 w-full sm:w-1/3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-40 object-contain"
                  />
                </div>

                <div className="flex flex-col justify-between w-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: <strong>{product.quantity}</strong>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Price per item: ₹{product.price}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() =>
                        dispatch(removeOneItemFromCart(product.product))
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-md"
                    >
                      -1 Quantity
                    </button>
                    <button
                      onClick={() =>
                        dispatch(removeItemsFromCart(product.product))
                      }
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
                    >
                      Remove All
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section - Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>
            <div className="text-gray-700 mb-2">
              Total Items: <strong>{quantity}</strong>
            </div>
            <div className="text-gray-700 mb-4">
              Total Amount:{" "}
              <span className="text-xl font-bold text-green-600">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-medium"
              onClick={() => navigate("/shipping")}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
