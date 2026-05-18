import mongoose from "mongoose";
import { Bookmark } from "../models/Bookmark.js";
import { Like } from "../models/Like.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createSlug } from "../utils/slug.js";

const calculateReadTime = (content) => Math.max(1, Math.ceil(content.split(/\s+/).length / 220));

export const createPost = asyncHandler(async (req, res) => {
  const slug = `${createSlug(req.body.title)}-${Date.now().toString(36)}`;
  const isPublished = req.body.status === "published";

  const post = await Post.create({
    ...req.body,
    slug,
    author: req.user._id,
    readTime: calculateReadTime(req.body.content),
    publishedAt: isPublished ? new Date() : null
  });

  await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: 1 } });

  res.status(201).json({ success: true, data: post });
});

export const getPosts = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 30);
  const skip = (page - 1) * limit;
  const filter = { status: "published" };

  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.category) filter.category = req.query.category;
  if (req.query.q) filter.$text = { $search: req.query.q };

  const [items, total] = await Promise.all([
    Post.find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name username avatar")
      .lean(),
    Post.countDocuments(filter)
  ]);

  res.json({
    success: true,
    data: {
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

export const getTrendingPosts = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 8, 20);

  const items = await Post.find({ status: "published" })
    .sort({ likesCount: -1, commentsCount: -1, viewsCount: -1, publishedAt: -1 })
    .limit(limit)
    .populate("author", "name username avatar bio")
    .lean();

  res.json({ success: true, data: items });
});

export const getRecommendedPosts = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 8, 20);
  const tags = String(req.query.tags || "")
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  const filter = { status: "published" };

  if (tags.length) {
    filter.tags = { $in: tags };
  } else if (req.query.category) {
    filter.category = String(req.query.category).toLowerCase();
  }

  const items = await Post.find(filter)
    .sort({ publishedAt: -1, viewsCount: -1 })
    .limit(limit)
    .populate("author", "name username avatar")
    .lean();

  res.json({ success: true, data: items });
});

export const getCreatorDashboard = asyncHandler(async (req, res) => {
  const [summary, recentPosts] = await Promise.all([
    Post.aggregate([
      { $match: { author: req.user._id } },
      {
        $group: {
          _id: "$status",
          posts: { $sum: 1 },
          views: { $sum: "$viewsCount" },
          likes: { $sum: "$likesCount" },
          comments: { $sum: "$commentsCount" },
          bookmarks: { $sum: "$bookmarksCount" }
        }
      }
    ]),
    Post.find({ author: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(10)
      .select("title slug status viewsCount likesCount commentsCount bookmarksCount updatedAt")
      .lean()
  ]);

  const totals = summary.reduce(
    (acc, item) => {
      acc.status[item._id] = item.posts;
      acc.posts += item.posts;
      acc.views += item.views;
      acc.likes += item.likes;
      acc.comments += item.comments;
      acc.bookmarks += item.bookmarks;
      return acc;
    },
    {
      posts: 0,
      views: 0,
      likes: 0,
      comments: 0,
      bookmarks: 0,
      status: { draft: 0, published: 0, archived: 0 }
    }
  );

  res.json({ success: true, data: { totals, recentPosts } });
});

export const getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { slug: req.params.slug, status: "published" },
    { $inc: { viewsCount: 1 } },
    { new: true }
  )
    .populate("author", "name username avatar bio")
    .lean();

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  res.json({ success: true, data: post });
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, author: req.user._id });

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  Object.assign(post, req.body);

  if (req.body.title) {
    post.slug = `${createSlug(req.body.title)}-${post._id.toString().slice(-6)}`;
  }

  if (req.body.content) {
    post.readTime = calculateReadTime(req.body.content);
  }

  if (req.body.status === "published" && !post.publishedAt) {
    post.publishedAt = new Date();
  }

  await post.save();
  res.json({ success: true, data: post });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: -1 } });
  res.status(204).send();
});

export const likePost = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    const like = await Like.create([{ user: req.user._id, post: req.params.id }], { session });
    await Post.findByIdAndUpdate(like[0].post, { $inc: { likesCount: 1 } }, { session });
  });

  await session.endSession();
  res.status(201).json({ success: true });
});

export const unlikePost = asyncHandler(async (req, res) => {
  const like = await Like.findOneAndDelete({ user: req.user._id, post: req.params.id });

  if (like) {
    await Post.findByIdAndUpdate(req.params.id, { $inc: { likesCount: -1 } });
  }

  res.status(204).send();
});

export const bookmarkPost = asyncHandler(async (req, res) => {
  await Bookmark.create({ user: req.user._id, post: req.params.id });
  await Post.findByIdAndUpdate(req.params.id, { $inc: { bookmarksCount: 1 } });
  res.status(201).json({ success: true });
});

export const removeBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findOneAndDelete({ user: req.user._id, post: req.params.id });

  if (bookmark) {
    await Post.findByIdAndUpdate(req.params.id, { $inc: { bookmarksCount: -1 } });
  }

  res.status(204).send();
});
