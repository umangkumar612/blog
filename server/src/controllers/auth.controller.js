import crypto from "crypto";
import { RefreshToken } from "../models/RefreshToken.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signAccessToken, signRefreshToken } from "../utils/tokens.js";

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

export const register = asyncHandler(async (req, res) => {
  const userExists = await User.exists({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (userExists) {
    throw new ApiError(409, "Email or username is already in use");
  }

  const user = await User.create(req.body);
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  await RefreshToken.create({
    user: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
      },
      accessToken,
      refreshToken
    }
  });
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");

  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.isBlocked) {
    throw new ApiError(403, "Your account is blocked");
  }

  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  await RefreshToken.create({
    user: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
      },
      accessToken,
      refreshToken
    }
  });
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    await RefreshToken.deleteOne({ tokenHash: hashToken(refreshToken) });
  }

  res.status(204).send();
});
