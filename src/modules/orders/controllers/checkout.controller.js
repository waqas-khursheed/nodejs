import {
  placeOrderService,
  getUserOrdersService,
  getUserOrderByIdService,
} from "../services/checkout.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

const errorMap = {
  EMPTY_CART: { code: 422, msg: "Your cart is empty" },
  COUPON_NOT_FOUND: { code: 404, msg: "Invalid or inactive coupon code" },
  COUPON_ALREADY_USED: { code: 409, msg: "You have already used this coupon" },
  COUPON_NOT_APPLICABLE: { code: 422, msg: "This coupon does not apply to any items in your cart" },
  STOCK_NOT_FOUND: { code: 422, msg: "Selected variation no longer exists" },
  INSUFFICIENT_STOCK: { code: 409, msg: "One or more items in your cart no longer have enough stock" },
  PRODUCT_NOT_FOUND: { code: 404, msg: "One or more products in your cart no longer exist" },
  ORDER_NOT_FOUND: { code: 404, msg: "Order not found" },
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
