import { Product } from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asycnHandler } from "../utils/AsycnHandler.js";

//create product
export const createProduct = asycnHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  if (!product) {
    res.status(400).json({ message: " Please enter all fields " });
  }
  return res
    .status(201)
    .json(new ApiResponse(201, product, " Product created successfully "));
});

//get product
export const getAllProduct = asycnHandler(async (req, res, next) => {
  const product = await Product.find(req.params.id);

  if (!product) {
    throw new ApiError(404, " Product not found or Product does not exists ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, " Product found succesfully "));
});

//update product
export const updateProduct = asycnHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, " Product does not exists ");
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, product, " Product updated Successfully "));
});

//delete product
export const deleteProduct = asycnHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new ApiError(
      404,
      "Product cannot be deleted because it does not exist "
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "", "Product deleted successfully"));
});
