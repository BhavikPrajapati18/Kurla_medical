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

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      // Ensure req.user exists before checking its role
      if (!req.user || !roles.includes(req.user.role)) {
        return next(
          new ApiError(
            `Role: ${
              req.user?.role || "undefined"
            } is not allowed to access this resource`,
            403
          )
        );
      }

      next();
    } catch (error) {
      next(new ApiError(500, "Something went wrong in role authorization"));
    }
  };
};
