import { createExchangeService } from "../services/exchange.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const createExchange = async (req, res) => {
  try {
    const result = await createExchangeService(req.body);
    return successDataResponse(res, "Exchange request submitted successfully", result, 201);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
