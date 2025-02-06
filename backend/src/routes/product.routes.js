import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controllers/products.controllers.js";

const router = Router();

router.route("/products").get(getAllProduct);

router.route("/products/create").post(createProduct);

router.route("/products/:id").put(updateProduct).delete(deleteProduct);

export default router;
