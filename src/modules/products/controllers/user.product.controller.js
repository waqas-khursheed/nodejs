import {
  getProductsService,
  getProductBySlugService,
  getRelatedProductsService,
  checkStockService,
} from "../services/user.product.service.js";
import { successDataResponse
} from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  PRODUCT_NOT_FOUND: { code: 404, msg: "Product not found" },
  STOCK_NOT_FOUND: { code: 404, msg: "Selected variation is not available" },
};

const handleServiceError = createErrorHandler(errorMap);

export const listProducts = async (req, res) => {
  try {
    const result = await getProductsService(req.query);
    return successDataResponse(res, "Products fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const result = await getProductBySlugService(req.params.slug);
    return successDataResponse(res, "Product fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const result = await getRelatedProductsService(req.params.slug, req.query.limit);
    return successDataResponse(res, "Related products fetched successfully", { products: result }, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const checkStock = async (req, res) => {
  try {
    const result = await checkStockService(req.params.slug, req.query);
    return successDataResponse(res, "Stock fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
