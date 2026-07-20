import {
  createExchangeService,
  getMyExchangesService,
  getMyExchangeByIdService,
} from "../services/exchange.service.js";
import { successDataResponse } from "../../../shared/responses/apiResponse.js";
import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  ORDER_NOT_FOUND: { code: 404, msg: "Order not found" },
  ORDER_NOT_ELIGIBLE: { code: 422, msg: "This order isn't eligible for an exchange yet (it must have shipped first)" },
  ORDER_DETAIL_NOT_FOUND: { code: 404, msg: "That item isn't part of this order" },
  EXCHANGE_ALREADY_REQUESTED: { code: 409, msg: "You already have a pending exchange request for this item" },
  REQUESTED_STOCK_NOT_FOUND: { code: 404, msg: "Selected replacement variation no longer exists" },
  INVALID_REPLACEMENT: { code: 422, msg: "The replacement must be a variation of the same product" },
  INSUFFICIENT_STOCK: { code: 409, msg: "The requested replacement is out of stock" },
  EXCHANGE_NOT_FOUND: { code: 404, msg: "Exchange request not found" },
};

const handleServiceError = createErrorHandler(errorMap);

export const createExchange = async (req, res) => {
  try {
    const result = await createExchangeService(req.user, req.body);
    return successDataResponse(res, "Exchange request submitted successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listMyExchanges = async (req, res) => {
  try {
    const result = await getMyExchangesService(req.user.id, req.query);
    return successDataResponse(res, "Exchange requests fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getMyExchange = async (req, res) => {
  try {
    const result = await getMyExchangeByIdService(req.user.id, req.params.id);
    return successDataResponse(res, "Exchange request fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
