import express from "express";
import Joi from "joi";
import { getProductCities, syncProductCities } from "../controllers/admin.productCity.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams } from "../../../shared/middleware/validateParams.middleware.js";

const productIdParamSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
});

const syncSchema = Joi.object({
  city_ids: Joi.array().items(Joi.number().integer().positive()).default([]),
});

const router = express.Router();

router.get(
  "/:productId",
  adminAuthMiddleware,
  validateParams(productIdParamSchema),
  getProductCities
);

router.put(
  "/:productId",
  adminAuthMiddleware,
  validateParams(productIdParamSchema),
  validate(syncSchema),
  syncProductCities
);

export default router;
