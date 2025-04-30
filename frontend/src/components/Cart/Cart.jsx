import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, quantity } = useSelector((state) => state.cart);
  console.log(cart);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Empty Cart
  if (cart?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <ShoppingCart size={80} className="text-gray-400" />
        <h1 className="mt-6 text-3xl font-semibold text-gray-600">
          Your Cart is Empty
        </h1>
        <p className="mt-2 text-gray-500">
          Add some products to see them here!
        </p>
      </div>
    );
  }

  // Filled Cart
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Your Cart</h1>

      {/* Display Quantity */}
      <div className="mb-6 text-xl font-medium text-gray-700">
        Total Items: {quantity}
      </div>

      <div className="mt-10 text-xl font-semibold text-gray-800">
        Total Amount: ₹{totalAmount.toFixed(2)}
        <button className="bg-red-500 font-thin mx-2 text-white px-6 py-2 rounded-md">
          Place your order
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cart?.map((product) => (
          <div
            key={product._id}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition hover:shadow-lg"
          >
            {/* Product Image */}
            <div className="relative flex h-[240px] w-full items-center justify-center bg-[#f3f8fa] rounded-t-2xl p-4">
              <img
                src={product.image}
                alt={`${product._id} image`}
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="absolute left-2 top-2 rounded-md bg-[#FB991C] px-3 py-1 text-xs font-bold text-white shadow-md">
                -15%
              </span>
            </div>

            {/* Product Details */}
            <div className="p-6">
              <h3 className="mb-3 text-lg font-medium text-gray-800 line-clamp-2 group-hover:text-[#1C7690]">
                {product.title}{" "}
                <span className="text-sm text-gray-500">
                  ×{product.quantity}
                </span>
              </h3>

              <div className="mb-4 flex items-center gap-2">
                <span className="text-xl font-bold text-[#FB991C]">
                  ₹{product.price}
                </span>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(product._id)}
                className="w-full rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-600 transition duration-200"
              >
                Remove from Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
