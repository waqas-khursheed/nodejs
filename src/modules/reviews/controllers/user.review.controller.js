import { createReviewService, getProductReviewsService } from "../services/user.review.service.js";
import { successDataResponse
} from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  PRODUCT_NOT_FOUND: { code: 404, msg: "Product not found" },
  ALREADY_REVIEWED: { code: 409, msg: "You have already reviewed this product" },
};

const handleServiceError = createErrorHandler(errorMap);

export const createReview = async (req, res) => {
  try {
    const result = await createReviewService(req.user, req.body);
    return successDataResponse(res, "Review submitted successfully — it will appear once approved", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listProductReviews = async (req, res) => {
  try {
    const result = await getProductReviewsService(req.params.productId, req.query);
    return successDataResponse(res, "Reviews fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
