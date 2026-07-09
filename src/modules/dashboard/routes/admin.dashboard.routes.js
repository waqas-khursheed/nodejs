import express from "express";
import Joi from "joi";
import {
  getOverview,
  getOrderStats,
  getTopProducts,
  getSalesReport,
} from "../controllers/admin.dashboard.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validateQuery } from "../../../shared/middleware/validateParams.middleware.js";

const topProductsQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(50).default(10),
});

const salesReportQuerySchema = Joi.object({
  from: Joi.date().iso(),
  to: Joi.date().iso(),
});

const router = express.Router();

router.get("/overview", adminAuthMiddleware, getOverview);
router.get("/order-stats", adminAuthMiddleware, getOrderStats);
router.get("/top-products", adminAuthMiddleware, validateQuery(topProductsQuerySchema), getTopProducts);
router.get("/sales-report", adminAuthMiddleware, validateQuery(salesReportQuerySchema), getSalesReport);

export default router;
