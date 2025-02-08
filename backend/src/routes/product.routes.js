import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controllers/products.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/products/create").post(upload.single("image"), createProduct);

router.route("/products").get(getAllProduct);

router
  .route("/products/:id")
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct);

export default router;
