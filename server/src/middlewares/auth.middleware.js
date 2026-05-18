import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  const user = await User.findById(payload.sub).select("-password").lean();

  if (!user || user.isBlocked) {
    throw new ApiError(401, "Invalid authentication token");
  }

  req.user = user;
  next();
});

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    next(new ApiError(403, "You do not have permission to perform this action"));
    return;
  }

  next();
};
