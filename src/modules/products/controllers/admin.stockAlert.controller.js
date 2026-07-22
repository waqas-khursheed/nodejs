import { getStockAlertsService, deleteStockAlertService } from "../services/stockAlert.service.js";
import { successResponse, successDataResponse } from "../../../shared/responses/apiResponse.js";
import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  STOCK_ALERT_NOT_FOUND: { code: 404, msg: "Stock alert not found" },
};

const handleServiceError = createErrorHandler(errorMap);

export const listStockAlerts = async (req, res) => {
  try {
    const result = await getStockAlertsService(req.query);

    return successDataResponse(res, "Stock alerts fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteStockAlert = async (req, res) => {
  try {
    await deleteStockAlertService(req.params.id);

    return successResponse(res, "Stock alert deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
