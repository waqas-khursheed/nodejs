import express from "express";
import { adminLogin } from "../controllers/admin.auth.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";

const router = express.Router();

router.post("/login", adminLogin);

export default router;