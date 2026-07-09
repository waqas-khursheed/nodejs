import express from "express";
import Joi from "joi";
import { applyCoupon } from "../controllers/user.coupon.controller.js";
import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";

const applySchema = Joi.object({
  code: Joi.string().trim().min(2).max(50).required(),
});

const router = express.Router();

router.post("/apply", authMiddleware, validate(applySchema), applyCoupon);

export default router;
