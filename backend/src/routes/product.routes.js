import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductDetails,
  updateProduct,
} from "../controllers/products.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.middleware.js";

const router = Router();

//Get All Products
router.route("/products").get(getAllProduct);

//Get product details
router.route("/products/:id").get(getProductDetails);

//ADMIN
//Create Product
router
  .route("/admin/products/create")
  .post(
    upload.single("image"),
    verifyJWT,
    authorizeRoles("admin"),
    createProduct
  );

// Update Product
//Delete Product
router
  .route("/admin/products/:id")
  .put(
    upload.single("image"),
    verifyJWT,
    authorizeRoles("admin"),
    updateProduct
  )
  .delete(deleteProduct, verifyJWT, authorizeRoles("admin"));

export default router;
