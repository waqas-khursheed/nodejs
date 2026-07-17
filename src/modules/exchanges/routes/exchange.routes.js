import express from "express";
import { createExchange } from "../controllers/exchange.controller.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { publicFormLimiter } from "../../../shared/middleware/rateLimiter.js";
import { createExchangeSchema } from "../validations/exchange.validation.js";

const router = express.Router();

router.post("/", publicFormLimiter, validate(createExchangeSchema), createExchange);

export default router;
