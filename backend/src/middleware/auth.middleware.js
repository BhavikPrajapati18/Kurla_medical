import { asycnHandler } from "../utils/AsycnHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asycnHandler(async (req, res, next) => {
  // console.log(req.cookies);
  // console.log(verifyJWT);
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token);

    if (!token) {
      throw new ApiError(401, " Unauthorize request ");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      //dicuss about frontend
      throw new ApiError(401, " Invalid access Token  ");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access to token");
  }
});
