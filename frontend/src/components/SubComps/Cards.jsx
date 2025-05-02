import React, { useEffect, useState } from "react";
import { addItemsToCart } from "../../store/actions/cartAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BadgeInfo } from "lucide-react";
import { getProduts } from "../../store/actions/productAction.js";
import { toast } from "react-toastify";

function Cards() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantities, setQuantities] = useState({});

  const showAlert = () => {
    toast.success("Product Added successfully!");
  };

  const {
    products = [],
    loading,
    productsCount,
    error,
  } = useSelector(((state) => state.products) || {});

  useEffect(() => {
    dispatch(getProduts());
  }, [dispatch]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      const initialQuantities = {};
      products.forEach((product) => {
        initialQuantities[product._id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [products]);

  const increaseQuantity = (id, stock) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      if (current >= stock) return prev;
      return { ...prev, [id]: current + 1 };
    });
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      if (current <= 1) return prev;
      return { ...prev, [id]: current - 1 };
    });
  };

  const filterProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search & Category */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <select
          className="w-40 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-[#1C7690] focus:ring-2 focus:ring-[#1C7690] focus:outline-none transition duration-300"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Test">Test</option>
          <option value="Med">Med</option>
          <option value="personal-care">Personal Care</option>
          <option value="supplements">Supplements</option>
        </select>

        <input
          className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-[#1C7690] focus:ring-2 focus:ring-[#1C7690] focus:outline-none transition duration-300"
          type="text"
          value={search}
          placeholder="Search for products..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-8 px-4">
        {filterProducts.length > 0 ? (
          filterProducts.map((product) => {
            const quantity = quantities[product._id] || 1;

            return (
              <div
                key={product._id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                {/* Image */}
                <Link to={`/product/${product._id}`}>
                  <div className="relative flex h-[240px] w-full items-center justify-center rounded-t-xl bg-white p-4">
                    <img
                      src={product.image}
                      alt={`${product._id} image`}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="absolute left-2 top-2 rounded-md bg-[#FB991C] px-3 py-1 text-sm font-bold text-white shadow-md">
                      -15%
                    </span>
                  </div>
                </Link>

                {/* Details */}
                <div className="p-4 bg-[#f3f8fa]">
                  <h3 className="mb-4 text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-[#1C7690]">
                    {product.name}
                  </h3>

                  <div className="mb-6 flex items-center gap-2">
                    <span className="text-lg font-bold text-[#FB991C]">
                      ₹{product.price}
                    </span>
                    {product.pre_price && (
                      <span className="text-sm font-medium text-gray-400 line-through">
                        ₹{product.pre_price}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-center justify-between gap-4">
                      <button
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="flex items-center justify-center rounded-lg bg-blue-200 px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-300 transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        <BadgeInfo className="mr-1" size={16} /> View
                      </button>

                      <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1 bg-white shadow-sm">
                        <button
                          onClick={() => decreaseQuantity(product._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-[#f0f0f0] hover:scale-105 transition-all duration-200"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          readOnly
                          type="number"
                          value={quantity}
                          className="w-10 text-center border-none bg-transparent text-base font-medium text-gray-800 focus:outline-none"
                        />
                        <button
                          onClick={() =>
                            increaseQuantity(product._id, product.stock)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-[#f0f0f0] hover:scale-105 transition-all duration-200"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => {
                        showAlert();
                        dispatch(addItemsToCart(product._id, quantity));
                      }}
                      className="w-full rounded-lg bg-[#1C7690] px-6 py-3 text-sm font-semibold text-white hover:bg-[#165a6c] transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No Products Found</p>
        )}
      </div>
    </div>
  );
}

export default Cards;
