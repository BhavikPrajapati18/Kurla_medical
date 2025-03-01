import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../store/cartSlice";
import { getProdutDetails } from "../../store/actions/productAction.js";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    product = {},
    loading,
    error,
  } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProdutDetails(id));
    console.log("Product Data:", product);
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-center text-blue-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!product || Object.keys(product).length === 0) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  // Ensure reviews is an array
  const reviewsArray = Array.isArray(product.reviews)
    ? product.reviews
    : JSON.parse(product.reviews || "[]");

  console.log(" reviewsArray :-  ", reviewsArray);

  return (
    <div className="max-w-4xl mx-auto py-28">
      <div className="flex flex-col md:flex-row justify-between bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>

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
          {product.stock > 0 && (
            <button
              onClick={() => dispatch(addCart(product))}
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

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
