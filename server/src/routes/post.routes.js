import { Router } from "express";
import {
  bookmarkPost,
  createPost,
  deletePost,
  getCreatorDashboard,
  getPostBySlug,
  getPosts,
  getRecommendedPosts,
  getTrendingPosts,
  likePost,
  removeBookmark,
  unlikePost,
  updatePost
} from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "../validators/post.validator.js";

const router = Router();

router.get("/", getPosts);
router.get("/feed/trending", getTrendingPosts);
router.get("/feed/recommended", getRecommendedPosts);
router.get("/creator/dashboard", authenticate, getCreatorDashboard);
router.get("/:slug", getPostBySlug);
router.post("/", authenticate, validate(createPostSchema), createPost);
router.patch("/:id", authenticate, validate(updatePostSchema), updatePost);
router.delete("/:id", authenticate, deletePost);
router.post("/:id/like", authenticate, likePost);
router.delete("/:id/like", authenticate, unlikePost);
router.post("/:id/bookmark", authenticate, bookmarkPost);
router.delete("/:id/bookmark", authenticate, removeBookmark);

export default router;
