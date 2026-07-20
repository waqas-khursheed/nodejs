import { getWebSettingService } from "../services/webSetting.service.js";
import { successDataResponse } from "../../../shared/responses/apiResponse.js";
import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  NOT_CONFIGURED: { code: 404, msg: "Web settings have not been configured yet" },
};

const handleServiceError = createErrorHandler(errorMap);

export const getPublicWebSetting = async (req, res) => {
  try {
    const result = await getWebSettingService();
    return successDataResponse(res, "Web settings fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
