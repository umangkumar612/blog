import { Follow } from "../models/Follow.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
    .select("-password -email")
    .lean();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.json({ success: true, data: user });
});

export const updateMe = asyncHandler(async (req, res) => {
  const allowedFields = ["name", "bio", "avatar", "socialLinks"];
  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true
  }).select("-password");

  res.json({ success: true, data: user });
});

export const followUser = asyncHandler(async (req, res) => {
  if (req.user._id.toString() === req.params.id) {
    throw new ApiError(400, "You cannot follow yourself");
  }

  await Follow.create({ follower: req.user._id, following: req.params.id });

  await Promise.all([
    User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: 1 } }),
    User.findByIdAndUpdate(req.params.id, { $inc: { followersCount: 1 } })
  ]);

  res.status(201).json({ success: true });
});

export const unfollowUser = asyncHandler(async (req, res) => {
  const follow = await Follow.findOneAndDelete({
    follower: req.user._id,
    following: req.params.id
  });

  if (follow) {
    await Promise.all([
      User.findByIdAndUpdate(req.user._id, { $inc: { followingCount: -1 } }),
      User.findByIdAndUpdate(req.params.id, { $inc: { followersCount: -1 } })
    ]);
  }

  res.status(204).send();
});
