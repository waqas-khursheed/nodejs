import {
  getReviewsService,
  getReviewByIdService,
  updateReviewStatusService,
  deleteReviewService,
} from "../services/review.service.js";
import {
  successResponse,
  successDataResponse,
  } from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  REVIEW_NOT_FOUND: { code: 404, msg: "Review not found" },
};

const handleServiceError = createErrorHandler(errorMap);

export const listReviews = async (req, res) => {
  try {
    const result = await getReviewsService(req.query);
    return successDataResponse(res, "Reviews fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getReview = async (req, res) => {
  try {
    const result = await getReviewByIdService(req.params.id);
    return successDataResponse(res, "Review fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateReviewStatus = async (req, res) => {
  try {
    const result = await updateReviewStatusService(req.params.id, req.body.status);
    return successDataResponse(res, "Review status updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteReview = async (req, res) => {
  try {
    await deleteReviewService(req.params.id);
    return successResponse(res, "Review deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
