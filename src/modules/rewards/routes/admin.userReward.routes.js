import express from "express";
import Joi from "joi";
import { listUserRewards, getUserReward } from "../controllers/admin.userReward.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";

const idParamSchema = Joi.object({ id: Joi.number().integer().positive().required() });
const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  user_id: Joi.number().integer().positive(),
});

const router = express.Router();

router.get("/", adminAuthMiddleware, validateQuery(listQuerySchema), listUserRewards);
router.get("/:id", adminAuthMiddleware, validateParams(idParamSchema), getUserReward);

export default router;
