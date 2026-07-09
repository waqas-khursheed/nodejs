import {
  getProductCitiesService,
  syncProductCitiesService,
} from "../services/productCity.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

const errorMap = {
  PRODUCT_NOT_FOUND: { code: 404, msg: "Product not found" },
  CITY_NOT_FOUND: { code: 422, msg: "One or more selected cities do not exist" },
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

export const getProductCities = async (req, res) => {
  try {
    const result = await getProductCitiesService(req.params.productId);
    return successDataResponse(res, "Product cities fetched successfully", { productCities: result }, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const syncProductCities = async (req, res) => {
  try {
    const result = await syncProductCitiesService(req.params.productId, req.body.city_ids);
    return successDataResponse(res, "Product cities updated successfully", { productCities: result }, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
