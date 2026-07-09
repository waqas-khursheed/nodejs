import {
  createFaqService,
  getFaqsService,
  getFaqByIdService,
  updateFaqService,
  deleteFaqService,
} from "../services/faq.service.js";
import {
  successResponse,
  successDataResponse,
  errorResponse,
} from "../../../shared/responses/apiResponse.js";

const errorMap = {
  FAQ_NOT_FOUND: { code: 404, msg: "FAQ not found" },
  CATEGORY_NOT_FOUND: { code: 422, msg: "FAQ category does not exist" },
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

export const createFaq = async (req, res) => {
  try {
    const result = await createFaqService(req.body);
    return successDataResponse(res, "FAQ created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listFaqs = async (req, res) => {
  try {
    const result = await getFaqsService(req.query);
    return successDataResponse(res, "FAQs fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getFaq = async (req, res) => {
  try {
    const result = await getFaqByIdService(req.params.id);
    return successDataResponse(res, "FAQ fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateFaq = async (req, res) => {
  try {
    const result = await updateFaqService(req.params.id, req.body);
    return successDataResponse(res, "FAQ updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteFaq = async (req, res) => {
  try {
    await deleteFaqService(req.params.id);
    return successResponse(res, "FAQ deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
