import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../store/actions/cartAction.js";
import { getProdutDetails } from "../../store/actions/productAction.js";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const showAlert = () => {
    toast.success("Product Added successfully!");
  };

  const {
    product = {},
    loading,
    error,
  } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProdutDetails(id));
  }, [dispatch, id]);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product || Object.keys(product).length === 0)
    return <p className="text-center text-red-500">Product not found!</p>;

  const reviewsArray = Array.isArray(product.reviews)
    ? product.reviews
    : JSON.parse(product.reviews || "[]");

  return (
    <div className="max-w-4xl mx-auto py-28">
      <div className="flex flex-col md:flex-row justify-between bg-white p-6 rounded-lg shadow-lg">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 text-lg mb-4">
            <span className="font-semibold text-black">Description: </span>
            {product.description}
          </p>
          <p className="text-2xl text-green-600 font-semibold mb-2">
            <span className="font-semibold text-black">MRP: </span>₹{" "}
            {product.price}
          </p>
          {product.pre_price && (
            <p className="text-lg text-gray-500 line-through">
              ₹ {product.pre_price}
            </p>
          )}
          {product.discount && (
            <p className="text-sm text-red-500">{product.discount}% off</p>
          )}
          <p
            className={`text-lg ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            } mb-4`}
          >
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </p>
          <p className="text-lg text-yellow-500">⭐ {product.rating} / 5</p>

          {/* Quantity controls */}
          {product.stock > 0 && (
            <div className="flex items-center gap-2 mt-4 border w-max px-2 py-1 rounded-md shadow-sm">
              <button
                onClick={decreaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-[#f0f0f0] hover:scale-105 transition-all duration-200"
              >
                −
              </button>
              <input
                readOnly
                type="number"
                value={quantity}
                className="w-10 text-center bg-transparent font-medium"
              />
              <button
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-[#f0f0f0] hover:scale-105 transition-all duration-200"
              >
                +
              </button>
            </div>
          )}

          {/* Add to Cart */}
          {product.stock > 0 && (
            <button
              onClick={() => {
                showAlert();
                const cartdit = dispatch(addItemsToCart(product._id, quantity));
                console.log(cartdit);
              }}
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Customer Reviews
        </h2>
        {reviewsArray.length > 0 ? (
          reviewsArray.map((review, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {review.name}
              </h3>
              <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
              <p className="text-gray-600 italic">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet!</p>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
