import express from "express";
import { getMyRewardBalance, getRewardSettings } from "../controllers/user.reward.controller.js";
import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.get("/settings", getRewardSettings);
router.get("/balance", authMiddleware, getMyRewardBalance);

export default router;
