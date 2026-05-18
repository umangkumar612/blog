import { Comment } from "../models/Comment.js";
import { Post } from "../models/Post.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res) => {
  const post = await Post.exists({ _id: req.params.postId, status: "published" });

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const comment = await Comment.create({
    post: req.params.postId,
    author: req.user._id,
    parentComment: req.body.parentComment || null,
    content: req.body.content
  });

  await Post.findByIdAndUpdate(req.params.postId, { $inc: { commentsCount: 1 } });

  res.status(201).json({ success: true, data: comment });
});

export const getPostComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({
    post: req.params.postId,
    isDeleted: false
  })
    .sort({ createdAt: 1 })
    .populate("author", "name username avatar")
    .lean();

  res.json({ success: true, data: comments });
});

export const updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id, isDeleted: false },
    { content: req.body.content, isEdited: true },
    { new: true }
  );

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  res.json({ success: true, data: comment });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id, isDeleted: false },
    { isDeleted: true, content: "" },
    { new: true }
  );

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  await Post.findByIdAndUpdate(comment.post, { $inc: { commentsCount: -1 } });
  res.status(204).send();
});
