import { Product } from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asycnHandler } from "../utils/AsycnHandler.js";
import { uploadCloudinary, cloudinary } from "../utils/Cloudinary.js";

//create product
export const createProduct = asycnHandler(async (req, res, next) => {
  const imagelocalpath = req.files?.image[0]?.path;

  if (!imagelocalpath) {
    throw new ApiError(500, "Please upload product image properly !!");
  }

  const image = await uploadCloudinary(imagelocalpath);

  if (!image || !image.url) {
    throw new ApiError(500, "Image upload failed");
  }

  // Create product with image URL included
  const product = await Product.create({
    ...req.body,
    image: image.url,
  });

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
  let updatedData = { ...req.body };

  if (req.file) {
    const imagelocalpath = req.file?.path;

    if (!imagelocalpath) {
      throw new ApiError(400, "image path not found");
    }

    const image = await uploadCloudinary(imagelocalpath);

    if (!image.url) {
      throw new ApiError(400, "Image didn't got posted on cloudinary");
    }
    updatedData.image = image;
  }

  let product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, " Product does not exists ");
  }

  product = await Product.findByIdAndUpdate(req.params.id, updatedData, {
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
  // Find the product first
  console.log(uploadCloudinary);
  // console.log(product.image);
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(
      404,
      "Product cannot be deleted because it does not exist "
    );
  }

  // If there is an image URL, delete it from Cloudinary
  if (product.image) {
    // Get the public ID from the image URL
    const imagePublicId = product.image
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];
    console.log(imagePublicId);

    try {
      // Delete image from Cloudinary
      const result = await cloudinary.uploader.destroy(imagePublicId);
      console.log(result);
      console.log("Image deleted from Cloudinary");
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  }

  // Delete the product from the database
  await Product.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "", "Product deleted successfully"));
});
