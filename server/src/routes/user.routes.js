import { Router } from "express";
import { followUser, getProfile, unfollowUser, updateMe } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:username", getProfile);
router.patch("/me/profile", authenticate, updateMe);
router.post("/:id/follow", authenticate, followUser);
router.delete("/:id/follow", authenticate, unfollowUser);

export default router;
