import express from "express";
import { listStockAlerts, deleteStockAlert } from "../controllers/admin.stockAlert.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import { stockAlertListQuerySchema, stockAlertIdParamSchema } from "../validations/stockAlert.validation.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, validateQuery(stockAlertListQuerySchema), listStockAlerts);

router.delete("/:id", adminAuthMiddleware, validateParams(stockAlertIdParamSchema), deleteStockAlert);

export default router;
