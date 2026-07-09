import express from "express";
import {
  listProducts,
  getProduct,
  getRelatedProducts,
  checkStock,
} from "../controllers/user.product.controller.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  productListQuerySchema,
  productSlugParamSchema,
  relatedProductsQuerySchema,
  stockCheckQuerySchema,
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

router.get("/:slug", validateParams(productSlugParamSchema), getProduct);

export default router;
