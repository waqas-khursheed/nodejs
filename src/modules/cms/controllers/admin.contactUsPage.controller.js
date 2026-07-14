import {
  getContactUsPageService,
  upsertContactUsPageService,
} from "../services/contactUsPage.service.js";
import { successDataResponse
} from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  NOT_CONFIGURED: { code: 404, msg: "Contact us page has not been configured yet" },
  TITLE_CONTENT_REQUIRED: { code: 422, msg: "title and content are required to create the contact us page" },
};

const handleServiceError = createErrorHandler(errorMap);

export const getContactUsPage = async (req, res) => {
  try {
    const result = await getContactUsPageService();
    return successDataResponse(res, "Contact us page fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateContactUsPage = async (req, res) => {
  try {
    const result = await upsertContactUsPageService(req.body);
    return successDataResponse(res, "Contact us page updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
