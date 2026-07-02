import {
  createStockService,
  getStocksService,
  getStockByIdService,
  updateStockService,
  deleteStockService,
} from "../services/stock.service.js";
import {
  successResponse,
  successDataResponse,
  errorResponse,
} from "../../../shared/responses/apiResponse.js";

const errorMap = {
  PRODUCT_NOT_FOUND: { code: 422, msg: "Selected product does not exist" },
  STOCK_NOT_FOUND: { code: 404, msg: "Stock entry not found" },
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

export const createStock = async (req, res) => {
  try {
    const result = await createStockService(req.body);

    return successDataResponse(res, "Stock created successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const listStocks = async (req, res) => {
  try {
    const result = await getStocksService(req.query);

    return successDataResponse(res, "Stocks fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getStock = async (req, res) => {
  try {
    const result = await getStockByIdService(req.params.id);

    return successDataResponse(res, "Stock fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateStock = async (req, res) => {
  try {
    const result = await updateStockService(req.params.id, req.body);

    return successDataResponse(res, "Stock updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteStock = async (req, res) => {
  try {
    await deleteStockService(req.params.id);

    return successResponse(res, "Stock deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
