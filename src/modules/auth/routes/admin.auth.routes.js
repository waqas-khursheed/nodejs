import express from "express";
import { adminLogin } from "../controllers/admin.auth.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { adminLoginSchema } from "../validations/admin.auth.validation.js";
import { authLimiter } from "../../../shared/middleware/rateLimiter.js";

const router = express.Router();

router.post("/login", authLimiter, validate(adminLoginSchema), adminLogin);

export default router;
