import {
  getExchangesService,
  getExchangeByIdService,
  markExchangeSeenService,
  deleteExchangeService,
} from "../services/exchange.service.js";
import { successResponse, successDataResponse } from "../../../shared/responses/apiResponse.js";
import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  EXCHANGE_NOT_FOUND: { code: 404, msg: "Exchange request not found" },
};

const handleServiceError = createErrorHandler(errorMap);

export const listExchanges = async (req, res) => {
  try {
    const result = await getExchangesService(req.query);

    return successDataResponse(res, "Exchange requests fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getExchange = async (req, res) => {
  try {
    const result = await getExchangeByIdService(req.params.id);

    return successDataResponse(res, "Exchange request fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const markExchangeSeen = async (req, res) => {
  try {
    const result = await markExchangeSeenService(req.params.id);

    return successDataResponse(res, "Exchange request marked as seen", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteExchange = async (req, res) => {
  try {
    await deleteExchangeService(req.params.id);

    return successResponse(res, "Exchange request deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
