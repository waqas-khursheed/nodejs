import {
  createCouponService,
  getCouponsService,
  getCouponByIdService,
  updateCouponService,
  toggleCouponStatusService,
  deleteCouponService,
} from "../services/coupon.service.js";
import {
  successResponse,
  successDataResponse,
  errorResponse,
} from "../../../shared/responses/apiResponse.js";

const errorMap = {
  COUPON_ALREADY_EXISTS: { code: 409, msg: "A coupon with this code already exists" },
  COUPON_NOT_FOUND: { code: 404, msg: "Coupon not found" },
  CATEGORY_NOT_FOUND: { code: 422, msg: "One or more selected categories do not exist" },
};

const handleServiceError = (res, err) => {
  const mapped = errorMap[err.message];

  if (mapped) {
    return errorResponse(res, mapped.msg, mapped.code);
  }

  return errorResponse(
    res,
    process.env.NODE_ENV === "development" ? err.message : "Internal Server Error",
    500
  );
};

export const createCoupon = async (req, res) => {
  try {
    const result = await createCouponService(req.body);

    return successDataResponse(res, "Coupon created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listCoupons = async (req, res) => {
  try {
    const result = await getCouponsService(req.query);

    return successDataResponse(res, "Coupons fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getCoupon = async (req, res) => {
  try {
    const result = await getCouponByIdService(req.params.id);

    return successDataResponse(res, "Coupon fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const result = await updateCouponService(req.params.id, req.body);

    return successDataResponse(res, "Coupon updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const toggleCouponStatus = async (req, res) => {
  try {
    const result = await toggleCouponStatusService(req.params.id);

    return successDataResponse(res, "Coupon status updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    await deleteCouponService(req.params.id);

    return successResponse(res, "Coupon deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
