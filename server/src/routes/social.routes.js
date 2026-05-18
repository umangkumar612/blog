import { Router } from "express";
import {
  createSocialPost,
  deleteSocialPost,
  getSocialFeed,
  getSocialPost,
  getSocialTrends,
  reactToSocialPost,
  repostSocialPost
} from "../controllers/social.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/feed", getSocialFeed);
router.get("/trends", getSocialTrends);
router.get("/posts/:id", getSocialPost);
router.post("/posts", authenticate, createSocialPost);
router.post("/posts/:id/react", authenticate, reactToSocialPost);
router.post("/posts/:id/repost", authenticate, repostSocialPost);
router.delete("/posts/:id", authenticate, deleteSocialPost);

export default router;
