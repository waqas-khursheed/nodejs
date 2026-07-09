import express from "express";
import { createReview, listProductReviews } from "../controllers/user.review.controller.js";
import { authMiddleware } from "../../../shared/middleware/auth.middleware.js";
import { validate } from "../../../shared/middleware/validate.middleware.js";
import { validateParams, validateQuery } from "../../../shared/middleware/validateParams.middleware.js";
import {
  createReviewSchema,
  productIdParamSchema,
  reviewListQuerySchema,
} from "../validations/user.review.validation.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createReviewSchema), createReview);

router.get(
  "/product/:productId",
  validateParams(productIdParamSchema),
  validateQuery(reviewListQuerySchema),
  listProductReviews
);

export default router;
