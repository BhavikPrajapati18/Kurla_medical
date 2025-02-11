import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.none(), registerUser);

router.route("/login").post(upload.none(), loginUser);

//secured Routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/change-password")
  .put(upload.none(), verifyJWT, changeCurrentPassword);

router.route("/current-user").get(getCurrentUser);

export default router;
