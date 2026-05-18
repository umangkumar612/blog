import { Router } from "express";
import {
  createComment,
  deleteComment,
  getPostComments,
  updateComment
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCommentSchema, updateCommentSchema } from "../validators/comment.validator.js";

const router = Router();

router.get("/posts/:postId/comments", getPostComments);
router.post(
  "/posts/:postId/comments",
  authenticate,
  validate(createCommentSchema),
  createComment
);
router.patch("/comments/:id", authenticate, validate(updateCommentSchema), updateComment);
router.delete("/comments/:id", authenticate, deleteComment);

export default router;
