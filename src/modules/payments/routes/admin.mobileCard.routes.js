import express from "express";
import Joi from "joi";
import { listMobileCards, getMobileCard, deleteMobileCard } from "../controllers/admin.mobileCard.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";

const idParamSchema = Joi.object({ id: Joi.number().integer().positive().required() });
const listQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  card_id: Joi.number().integer().positive(),
});

const router = express.Router();

router.get("/", adminAuthMiddleware, validateQuery(listQuerySchema), listMobileCards);
router.get("/:id", adminAuthMiddleware, validateParams(idParamSchema), getMobileCard);
router.delete("/:id", adminAuthMiddleware, validateParams(idParamSchema), deleteMobileCard);

export default router;
