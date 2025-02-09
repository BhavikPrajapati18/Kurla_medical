import { asycnHandler } from "../utils/AsycnHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
// import { uploadOnCloudiary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessandRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asycnHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;
  console.log(req.body);
  console.log("email : ", email, "password :", password);

  // checking all the fileds are filled or not
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fileds are required");
  }

  // checking is the user with email or username already exist
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(
      409,
      " User with this username or email already exists "
    );
  }

  // create user object - create entry in db
  //Sending all the data to the user model which is connected to the database system
  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
  });

  // remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, " Something went wrong while creating user ");
  }

  // return response
  return res
    .status(200)
    .json(new ApiResponse(201, createdUser, " User registered succesfully "));
});

const loginUser = asycnHandler(async (req, res) => {
  // User loggin kaise karege

  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  //Getting the data from req.body
  const { username, email, password } = req.body;
  console.log("email", email, "password", password);

  // checking all fields
  if (!(username || email)) {
    throw new ApiError(400, " Username or email is required ");
  }

  // finding the user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, " User not found !!");
  }

  // checking the password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, " Invalid User credentials ");
  }

  //generate Access and refresh token
  const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
    user._id
  );

  // create new user variable without the password and refreshToken
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // setup for cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  // return the response with cookies
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asycnHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  console.log(req);
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asycnHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Invalid access !");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decodedToken) {
    throw new ApiError(401, "Invalid Access!!");
  }

  try {
    const user = User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(404, "Invalid refresh Token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used");
    }

    const { accessToken, newrefreshToken } =
      await generateAccessandRefreshTokens(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newrefreshToken,
          },
          "Acess Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Access Token Not Refreshed");
  }
});

const changeCurrentPassword = asycnHandler(async (req, res) => {
  const { oldpassword, newpassword } = req.body;

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "Invalid User");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldpassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Incorrect Password");
  }

  user.password = newpassword;
  user.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asycnHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched"));
});

const updateAccountDetails = asycnHandler(async (req, res) => {
  const { fullName, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName: fullName,
        email: email,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Updated the account details"));
});

// const updateUserAvatar = asycnHandler(async (req, res) => {
//   const avatarLocalPath = req.file?.path;

//   if (!avatarLocalPath) {
//     throw new ApiError(400, "Avatar local path not found");
//   }

//   const avatar = await uploadOnCloudiary(avatarLocalPath);

//   if (!avatar.url) {
//     throw new ApiError(400, "Avatar didnt got posted on the Cloudnary ");
//   }

//   const user = await User.findByIdAndUpdate(
//     req.user?._id,
//     {
//       $set: {
//         avatar: avatar?.url,
//       },
//     },
//     {
//       new: true,
//     }
//   ).select("-password");

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "Avatar updated successfully"));
// });

// const updateUserCoverImage = asycnHandler(async (req, res) => {
//   const coverImageLocalPath = req.file?.path;

//   if (!coverImageLocalPath) {
//     throw new ApiError(400, "Avatar local path not found");
//   }

//   const coverImage = await uploadOnCloudiary(coverImageLocalPath);

//   if (!coverImage.url) {
//     throw new ApiError(400, "Avatar didnt got posted on the Cloudnary ");
//   }

//   const user = await User.findByIdAndUpdate(
//     req.user?._id,
//     {
//       $set: {
//         coverImage: coverImage?.url,
//       },
//     },
//     {
//       new: true,
//     }
//   ).select("-password");

//   return res
//     .status(200)
//     .json(new ApiResponse(200, user, "CoverImage updated successfully"));
// });

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  // updateUserAvatar,
  // updateUserCoverImage,
};
