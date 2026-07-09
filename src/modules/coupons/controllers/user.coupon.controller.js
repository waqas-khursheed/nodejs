import { previewCouponService } from "../services/user.coupon.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

const errorMap = {
  EMPTY_CART: { code: 422, msg: "Your cart is empty" },
  COUPON_NOT_FOUND: { code: 404, msg: "Invalid or inactive coupon code" },
  COUPON_ALREADY_USED: { code: 409, msg: "You have already used this coupon" },
  COUPON_NOT_APPLICABLE: { code: 422, msg: "This coupon does not apply to any items in your cart" },
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

export const applyCoupon = async (req, res) => {
  try {
    const result = await previewCouponService(req.user.id, req.body.code);
    return successDataResponse(res, "Coupon applied successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
