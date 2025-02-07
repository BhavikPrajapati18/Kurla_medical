import mongoose, { Schema } from "mongoose";

const productScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " Please enter the product name !"],
    },
    description: {
      type: String,
      required: [true, " Please enter the product details !"],
    },
    price: {
      type: Number,
      required: [true, " Please enter the product price !"],
      maxLength: [6, "Please enter valid price !"],
    },
    pre_price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, " PLease enter the product category"],
    },
    image: {
      type: String,
      required: [true, " Please upload the product image "],
    },
    stock: {
      type: Number,
      required: [true, " Please enter product stock"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: [true, "Please enter your name"],
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: [true, "Add a comment"],
        },
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productScheme);
