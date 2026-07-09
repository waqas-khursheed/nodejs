import express from "express";
import Joi from "joi";
import { checkCardDiscount } from "../controllers/user.cardDetail.controller.js";
import { validateQuery } from "../../../shared/middleware/validateParams.middleware.js";

const checkQuerySchema = Joi.object({
  card_no: Joi.number().integer().required(),
});

const router = express.Router();

router.get("/check", validateQuery(checkQuerySchema), checkCardDiscount);

export default router;
