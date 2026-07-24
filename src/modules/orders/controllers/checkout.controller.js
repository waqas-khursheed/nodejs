import {
  placeOrderService,
  getUserOrdersService,
  getUserOrderByIdService,
  cancelOrderService,
} from "../services/checkout.service.js";
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
  STOCK_NOT_FOUND: { code: 422, msg: "Selected variation no longer exists" },
  INSUFFICIENT_STOCK: { code: 409, msg: "One or more items in your cart no longer have enough stock" },
  PRODUCT_NOT_FOUND: { code: 404, msg: "One or more products in your cart no longer exist" },
  ORDER_NOT_FOUND: { code: 404, msg: "Order not found" },
  ORDER_NOT_CANCELLABLE: { code: 409, msg: "This order can no longer be cancelled" },
};

const handleServiceError = createErrorHandler(errorMap);

export const checkout = async (req, res) => {
  try {
    const result = await placeOrderService(req.user, { ...req.body, user_ip: req.ip });
    return successDataResponse(res, "Order placed successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listMyOrders = async (req, res) => {
  try {
    const result = await getUserOrdersService(req.user.id, req.query);
    return successDataResponse(res, "Orders fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getMyOrder = async (req, res) => {
  try {
    const result = await getUserOrderByIdService(req.user.id, req.params.id);
    return successDataResponse(res, "Order fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const cancelMyOrder = async (req, res) => {
  try {
    const result = await cancelOrderService(req.user.id, req.params.id);
    return successDataResponse(res, "Order cancelled successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
