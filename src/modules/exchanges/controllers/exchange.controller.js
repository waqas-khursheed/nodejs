import { createExchangeService } from "../services/exchange.service.js";
import { successDataResponse
} from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  ORDER_NOT_FOUND: { code: 404, msg: "No order was found with that order number" },
  ORDER_EMAIL_MISMATCH: { code: 403, msg: "The email provided does not match this order" },
};

const handleServiceError = createErrorHandler(errorMap);

export const createExchange = async (req, res) => {
  try {
    const result = await createExchangeService(req.body);
    return successDataResponse(res, "Exchange request submitted successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
