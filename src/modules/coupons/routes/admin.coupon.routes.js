import express from "express";
import {
  createCoupon,
  listCoupons,
  getCoupon,
  updateCoupon,
  toggleCouponStatus,
  deleteCoupon,
  getCouponUsages,
} from "../controllers/admin.coupon.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  couponSchema,
  updateCouponSchema,
  couponIdParamSchema,
  couponListQuerySchema,
  couponUsagesQuerySchema,
} from "../validations/coupon.validation.js";

const router = express.Router();

router.post("/create", adminAuthMiddleware, validate(couponSchema), createCoupon);

router.get("/", adminAuthMiddleware, validateQuery(couponListQuerySchema), listCoupons);

router.get("/:id", adminAuthMiddleware, validateParams(couponIdParamSchema), getCoupon);

router.get(
  "/:id/usages",
  adminAuthMiddleware,
  validateParams(couponIdParamSchema),
  validateQuery(couponUsagesQuerySchema),
  getCouponUsages
);

router.put(
  "/:id",
  adminAuthMiddleware,
  validateParams(couponIdParamSchema),
  validate(updateCouponSchema),
  updateCoupon
);

router.patch(
  "/:id/status",
  adminAuthMiddleware,
  validateParams(couponIdParamSchema),
  toggleCouponStatus
);

router.delete("/:id", adminAuthMiddleware, validateParams(couponIdParamSchema), deleteCoupon);

export default router;
