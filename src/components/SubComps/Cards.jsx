import React from "react";
import products from "../../config.json";
import { addCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BadgeInfo } from "lucide-react";

function Cards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-8 px-4 ">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          {/* Product Image */}
          <div className="relative flex h-[240px] w-full items-center justify-center rounded-t-xl bg-[#f3f8fa] p-4">
            <img
              src={product.image}
              alt={`${product.id} image`}
              className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="absolute left-2 top-2 rounded-md bg-[#FB991C] px-3 py-1 text-sm font-bold text-white shadow-md">
              -15%
            </span>
          </div>

          {/* Product Details */}
          <div className="p-4">
            <h3 className="mb-4 text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-[#1C7690]">
              {product.title}
            </h3>

            <div className="mb-6 flex items-center gap-2">
              <span className="text-lg font-bold text-[#FB991C]">
                ₹{product.prv_price}
              </span>
              {product.price && (
                <span className="text-sm font-medium text-gray-400 line-through">
                  ₹{product.price}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {/* View Details */}
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex items-center justify-center rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 transition"
                aria-label={`View details of ${product.title}`}
              >
                <BadgeInfo className="mr-1" size={16} /> View
              </button>

              {/* Add to Cart */}
              <button
                onClick={() => dispatch(addCart(product))}
                className="flex-1 rounded-lg bg-[#1C7690] px-4 py-2 text-sm font-semibold text-white hover:bg-[#165a6c] transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
