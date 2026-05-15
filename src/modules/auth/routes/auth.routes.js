import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// router.get("/profile", authMiddleware, profile);

export default router;