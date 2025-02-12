import { Order } from "../models/order.model.js";
import { Product } from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asycnHandler } from "../utils/AsycnHandler.js";

// CREATE NEW ORDER
export const newOrder = asycnHandler(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrices,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrices,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "New Order created successfully"));
});

// SINGLE ORDER
export const getSingleOrder = asycnHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "fullName email"
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Orders found successfully"));
});

// SINGLE ORDER OF AN USER
export const myOrders = asycnHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id });

  if (!order) {
    throw new ApiError(404, "Your order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Your orders found successfully"));
});

// Admin can see all the orders -- ADMIN
export const getAllOrders = asycnHandler(async (req, res) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (!orders) {
    throw new ApiError(404, "No orders are placed yet");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { orders, totalAmount },
        "All Orders are found successfully"
      )
    );
});

// DELETE ORDER -- ADMIN
export const deleteOrder = asycnHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, "order not found");
  }

  await Order.findByIdAndDelete(req.params.id);

  return res.status(200).json(200, "", "All Orders are found successfully");
});

//Update Order
export const updateOrder = asycnHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.orderStatus === "Delivered") {
    throw new ApiError(400, "Product Already Delivered");
  }

  if (order.orderStatus === "Shipped") {
    order.orderItems.forEach(async (orderr) => {
      await updateStock(orderr.product, orderr.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "", "Order has been Updated as Delivered"));
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}
