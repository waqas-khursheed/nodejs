import express from "express";
import Joi from "joi";
import {
  listSubscribes,
  toggleSubscribeStatus,
  deleteSubscribe,
} from "../controllers/admin.subscribe.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";

const idParamSchema = Joi.object({ id: Joi.number().integer().positive().required() });
const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.number().valid(0, 1),
  search: Joi.string().allow(""),
});

const router = express.Router();

router.get("/", adminAuthMiddleware, validateQuery(listQuerySchema), listSubscribes);
router.patch("/:id/status", adminAuthMiddleware, validateParams(idParamSchema), toggleSubscribeStatus);
router.delete("/:id", adminAuthMiddleware, validateParams(idParamSchema), deleteSubscribe);

export default router;
