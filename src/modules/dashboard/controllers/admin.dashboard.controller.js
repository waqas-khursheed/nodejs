import {
  getDashboardOverviewService,
  getOrderStatsService,
  getTopProductsService,
  getSalesReportService,
} from "../services/dashboard.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

const handleError = (res, error) => {
  return errorResponse(
    res,
    process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
    500
  );
};

export const getOverview = async (req, res) => {
  try {
    const result = await getDashboardOverviewService();
    return successDataResponse(res, "Dashboard overview fetched successfully", result, 200);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getOrderStats = async (req, res) => {
  try {
    const result = await getOrderStatsService();
    return successDataResponse(res, "Order stats fetched successfully", result, 200);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const result = await getTopProductsService(req.query);
    return successDataResponse(res, "Top products fetched successfully", { topProducts: result }, 200);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getSalesReport = async (req, res) => {
  try {
    const result = await getSalesReportService(req.query);
    return successDataResponse(res, "Sales report fetched successfully", { salesReport: result }, 200);
  } catch (error) {
    return handleError(res, error);
  }
};
