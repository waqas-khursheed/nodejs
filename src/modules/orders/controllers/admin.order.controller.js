import {
  getOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  updatePaymentStatusService,
  markOrderSeenService,
  deleteOrderService,
} from "../services/order.service.js";
import {
  successResponse,
  successDataResponse,
  errorResponse,
} from "../../../shared/responses/apiResponse.js";

const errorMap = {
  ORDER_NOT_FOUND: { code: 404, msg: "Order not found" },
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

export const listOrders = async (req, res) => {
  try {
    const result = await getOrdersService(req.query);

    return successDataResponse(res, "Orders fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getOrder = async (req, res) => {
  try {
    const result = await getOrderByIdService(req.params.id);

    return successDataResponse(res, "Order fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const result = await updateOrderStatusService(req.params.id, req.body.status);

    return successDataResponse(res, "Order status updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateOrderPaymentStatus = async (req, res) => {
  try {
    const result = await updatePaymentStatusService(req.params.id, req.body.payment_status);

    return successDataResponse(res, "Order payment status updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const markOrderSeen = async (req, res) => {
  try {
    const result = await markOrderSeenService(req.params.id);

    return successDataResponse(res, "Order marked as seen", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await deleteOrderService(req.params.id);

    return successResponse(res, "Order deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
