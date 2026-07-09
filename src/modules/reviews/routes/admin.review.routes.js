import express from "express";
import {
  listReviews,
  getReview,
  updateReviewStatus,
  deleteReview,
} from "../controllers/admin.review.controller.js";
import { adminAuthMiddleware } from "../../../shared/middleware/admin.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  reviewIdParamSchema,
  reviewListQuerySchema,
  reviewStatusSchema,
} from "../validations/review.validation.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, validateQuery(reviewListQuerySchema), listReviews);

router.get("/:id", adminAuthMiddleware, validateParams(reviewIdParamSchema), getReview);

router.patch(
  "/:id/status",
  adminAuthMiddleware,
  validateParams(reviewIdParamSchema),
  validate(reviewStatusSchema),
  updateReviewStatus
);

router.delete("/:id", adminAuthMiddleware, validateParams(reviewIdParamSchema), deleteReview);

export default router;
