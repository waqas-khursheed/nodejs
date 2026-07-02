import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";
import { authLimiter } from "../../../shared/middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

// router.get("/profile", authMiddleware, profile);

export default router;