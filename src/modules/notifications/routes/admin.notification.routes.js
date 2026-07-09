import express from "express";
import Joi from "joi";
import {
  listNotifications,
  getNotification,
  markNotificationSeen,
  markAllNotificationsSeen,
  deleteNotification,
} from "../controllers/admin.notification.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";

const idParamSchema = Joi.object({ id: Joi.number().integer().positive().required() });
const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  seen: Joi.number().valid(0, 1),
  table_name: Joi.string().allow(""),
});

const router = express.Router();

router.get("/", adminAuthMiddleware, validateQuery(listQuerySchema), listNotifications);
router.get("/:id", adminAuthMiddleware, validateParams(idParamSchema), getNotification);
router.patch("/seen-all", adminAuthMiddleware, markAllNotificationsSeen);
router.patch("/:id/seen", adminAuthMiddleware, validateParams(idParamSchema), markNotificationSeen);
router.delete("/:id", adminAuthMiddleware, validateParams(idParamSchema), deleteNotification);

export default router;
