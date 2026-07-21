import {
  getWebSettingService,
  upsertWebSettingService,
} from "../services/webSetting.service.js";
import { successDataResponse
} from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  NOT_CONFIGURED: { code: 404, msg: "Web settings have not been configured yet" },
  REQUIRED_FIELDS_MISSING: {
    code: 422,
    msg: "delivery_start_time, delivery_end_time and delivery_days_time_mod are required for the initial setup",
  },
};

const handleServiceError = createErrorHandler(errorMap);

export const getWebSetting = async (req, res) => {
  try {
    const result = await getWebSettingService();
    return successDataResponse(res, "Web settings fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateWebSetting = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.files) {
      for (const field of ["main_logo", "fav_icon"]) {
        if (req.files[field]?.[0]) data[field] = req.files[field][0].filename;
      }
    }

    const result = await upsertWebSettingService(data);
    return successDataResponse(res, "Web settings updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
