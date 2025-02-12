import { Router } from "express";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/order.controllers.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/new").post(verifyJWT, newOrder);

router.route("/my-orders").get(verifyJWT, myOrders);

router
  .route("/order/:id")
  .get(verifyJWT, authorizeRoles("admin"), getSingleOrder);

router
  .route("/admin/get-all-orders")
  .get(verifyJWT, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(verifyJWT, authorizeRoles("admin"), updateOrder)
  .delete(verifyJWT, authorizeRoles("admin"), deleteOrder);

export default router;
