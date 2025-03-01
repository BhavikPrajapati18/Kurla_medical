import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../store/cartSlice";
import { getProdutDetails } from "../../store/actions/productAction.js";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  console.log(" Item.jsx Product details : ", product);
  useEffect(() => {
    dispatch(getProdutDetails(id));
  }, [dispatch, id]);

  if (!product) {
    return <p className="text-center text-red-500">Product not found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-28 ">
      {/* Product Info Section */}
      <div className="flex flex-col md:flex-row justify-between  bg-white p-6 rounded-lg shadow-lg">
        {/* Product Details */}
        <div className="w-full md:w-1/2 md:pl-8">
          {/* Product Title */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {product.name}
          </h1>
          <img src={product.image} alt="" />

          {/* Product Description */}
          <p className="text-gray-600 text-lg mb-6">
            <span className="font-semibold text-black">Description: </span>
            {product.description}
          </p>

          {/* Product MRP (Price) */}
          <p className="text-3xl text-green-600 font-semibold mb-4">
            <span className="font-semibold text-black">MRP: </span>₹{" "}
            {product.price}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => dispatch(addCart(product))}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
