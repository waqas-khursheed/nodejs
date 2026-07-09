import { subscribeService, submitContactFormService } from "../services/user.lead.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const subscribe = async (req, res) => {
  try {
    const result = await subscribeService(req.body.email);
    return successDataResponse(res, "Subscribed successfully", result, 201);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const submitContactForm = async (req, res) => {
  try {
    const result = await submitContactFormService(req.body);
    return successDataResponse(res, "Your message has been sent successfully", result, 201);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
