import { createReviewService, getProductReviewsService } from "../services/user.review.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

const errorMap = {
  PRODUCT_NOT_FOUND: { code: 404, msg: "Product not found" },
  ALREADY_REVIEWED: { code: 409, msg: "You have already reviewed this product" },
};

const handleServiceError = (res, err) => {
  const mapped = errorMap[err.message];
  if (mapped) return errorResponse(res, mapped.msg, mapped.code);

  return errorResponse(
    res,
    process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
    500
  );
};

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
