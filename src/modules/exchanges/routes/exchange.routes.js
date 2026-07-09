import express from "express";
import { createExchange } from "../controllers/exchange.controller.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { createExchangeSchema } from "../validations/exchange.validation.js";

const router = express.Router();

router.post("/", validate(createExchangeSchema), createExchange);

export default router;
