import express from "express";
import {
  createStock,
  listStocks,
  getStock,
  updateStock,
  deleteStock,
} from "../controllers/admin.stock.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  stockSchema,
  updateStockSchema,
  stockIdParamSchema,
  stockListQuerySchema,
} from "../validations/stock.validation.js";

const router = express.Router();

router.post("/create", adminAuthMiddleware, validate(stockSchema), createStock);

router.get("/", adminAuthMiddleware, validateQuery(stockListQuerySchema), listStocks);

router.get("/:id", adminAuthMiddleware, validateParams(stockIdParamSchema), getStock);

router.put(
  "/:id",
  adminAuthMiddleware,
  validateParams(stockIdParamSchema),
  validate(updateStockSchema),
  updateStock
);

router.delete("/:id", adminAuthMiddleware, validateParams(stockIdParamSchema), deleteStock);

export default router;
