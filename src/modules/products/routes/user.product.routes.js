import express from "express";
import {
  listProducts,
  getProduct,
  getRelatedProducts,
  checkStock,
  subscribeStockAlert,
} from "../controllers/user.product.controller.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import { publicFormLimiter } from "../../../shared/middleware/rateLimiter.js";
import {
  productListQuerySchema,
  productSlugParamSchema,
  relatedProductsQuerySchema,
  stockCheckQuerySchema,
  createStockAlertSchema,
} from "../validations/user.product.validation.js";

const router = express.Router();

router.get("/", validateQuery(productListQuerySchema), listProducts);

router.get(
  "/:slug/related",
  validateParams(productSlugParamSchema),
  validateQuery(relatedProductsQuerySchema),
  getRelatedProducts
);

router.get(
  "/:slug/stock",
  validateParams(productSlugParamSchema),
  validateQuery(stockCheckQuerySchema),
  checkStock
);

router.post(
  "/:slug/notify-stock",
  publicFormLimiter,
  validateParams(productSlugParamSchema),
  validate(createStockAlertSchema),
  subscribeStockAlert
);

router.get("/:slug", validateParams(productSlugParamSchema), getProduct);

export default router;
