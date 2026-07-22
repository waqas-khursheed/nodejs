import express from "express";
import {
  listOrders,
  getOrder,
  updateOrderStatus,
  updateOrderPaymentStatus,
  markOrderSeen,
  deleteOrder,
  bulkDeleteOrders,
} from "../controllers/admin.order.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  orderIdParamSchema,
  orderListQuerySchema,
  orderStatusSchema,
  orderPaymentStatusSchema,
} from "../validations/order.validation.js";
import { bulkDeleteSchema } from "../../../shared/validations/bulkDelete.validation.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, validateQuery(orderListQuerySchema), listOrders);

router.get("/:id", adminAuthMiddleware, validateParams(orderIdParamSchema), getOrder);

router.patch(
  "/:id/status",
  adminAuthMiddleware,
  validateParams(orderIdParamSchema),
  validate(orderStatusSchema),
  updateOrderStatus
);

router.patch(
  "/:id/payment-status",
  adminAuthMiddleware,
  validateParams(orderIdParamSchema),
  validate(orderPaymentStatusSchema),
  updateOrderPaymentStatus
);

router.patch(
  "/:id/seen",
  adminAuthMiddleware,
  validateParams(orderIdParamSchema),
  markOrderSeen
);

router.delete("/:id", adminAuthMiddleware, validateParams(orderIdParamSchema), deleteOrder);

router.post("/bulk-delete", adminAuthMiddleware, validate(bulkDeleteSchema), bulkDeleteOrders);

export default router;
