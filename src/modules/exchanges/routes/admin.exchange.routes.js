import express from "express";
import {
  listExchanges,
  getExchange,
  markExchangeSeen,
  deleteExchange,
} from "../controllers/admin.exchange.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import { exchangeIdParamSchema, exchangeListQuerySchema } from "../validations/exchange.validation.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, validateQuery(exchangeListQuerySchema), listExchanges);

router.get("/:id", adminAuthMiddleware, validateParams(exchangeIdParamSchema), getExchange);

router.patch("/:id/seen", adminAuthMiddleware, validateParams(exchangeIdParamSchema), markExchangeSeen);

router.delete("/:id", adminAuthMiddleware, validateParams(exchangeIdParamSchema), deleteExchange);

export default router;
