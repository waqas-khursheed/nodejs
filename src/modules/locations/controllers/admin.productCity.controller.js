import {
  getProductCitiesService,
  syncProductCitiesService,
} from "../services/productCity.service.js";
import { successDataResponse
} from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  PRODUCT_NOT_FOUND: { code: 404, msg: "Product not found" },
  CITY_NOT_FOUND: { code: 422, msg: "One or more selected cities do not exist" },
};

const handleServiceError = createErrorHandler(errorMap);

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
