import express from "express";
import { createExchange, listMyExchanges, getMyExchange } from "../controllers/exchange.controller.js";
import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import { publicFormLimiter } from "../../../shared/middleware/rateLimiter.js";
import {
  createExchangeSchema,
  exchangeIdParamSchema,
  exchangeListQuerySchema,
} from "../validations/exchange.validation.js";

const router = express.Router();

// Now requires auth — an exchange always references the requester's own
// order/order_detail, so there's no "anonymous" exchange request anymore.
router.post("/", authMiddleware, publicFormLimiter, validate(createExchangeSchema), createExchange);
router.get("/mine", authMiddleware, validateQuery(exchangeListQuerySchema), listMyExchanges);
router.get("/mine/:id", authMiddleware, validateParams(exchangeIdParamSchema), getMyExchange);

export default router;
