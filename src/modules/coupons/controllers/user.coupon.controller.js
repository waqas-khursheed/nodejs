import { previewCouponService } from "../services/user.coupon.service.js";
import { successDataResponse
} from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  EMPTY_CART: { code: 422, msg: "Your cart is empty" },
  COUPON_NOT_FOUND: { code: 404, msg: "Invalid or inactive coupon code" },
  COUPON_ALREADY_USED: { code: 409, msg: "You have already used this coupon" },
  COUPON_NOT_APPLICABLE: { code: 422, msg: "This coupon does not apply to any items in your cart" },
  COUPON_EXPIRED: { code: 422, msg: "This coupon has expired" },
  COUPON_USAGE_LIMIT_REACHED: { code: 409, msg: "This coupon has reached its usage limit" },
  COUPON_MIN_ORDER_NOT_MET: { code: 422, msg: "Your order does not meet this coupon's minimum amount" },
};

const handleServiceError = createErrorHandler(errorMap);

export const applyCoupon = async (req, res) => {
  try {
    const result = await previewCouponService(req.user.id, req.body.code);
    return successDataResponse(res, "Coupon applied successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
