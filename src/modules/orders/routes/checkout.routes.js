import express from "express";
import { checkout, listMyOrders, getMyOrder, cancelMyOrder } from "../controllers/checkout.controller.js";
import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import { checkoutSchema, orderIdParamSchema, orderListQuerySchema } from "../validations/checkout.validation.js";

const router = express.Router();

// NOTE: this router is mounted at the shared "/api" prefix (alongside other
// unrelated user-side routers), so auth is applied per-route rather than via
// a blanket router.use() — a router-wide middleware here would intercept
// every "/api/*" request, not just this router's own paths.

router.post("/checkout", authMiddleware, validate(checkoutSchema), checkout);
router.get("/orders", authMiddleware, validateQuery(orderListQuerySchema), listMyOrders);
router.get("/orders/:id", authMiddleware, validateParams(orderIdParamSchema), getMyOrder);
router.patch("/orders/:id/cancel", authMiddleware, validateParams(orderIdParamSchema), cancelMyOrder);

export default router;
