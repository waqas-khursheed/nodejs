import { getMyRewardBalanceService, getRewardSettingsService } from "../services/user.reward.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const getMyRewardBalance = async (req, res) => {
  try {
    const result = await getMyRewardBalanceService(req.user.id);
    return successDataResponse(res, "Reward balance fetched successfully", result, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const getRewardSettings = async (req, res) => {
  try {
    const result = await getRewardSettingsService();
    return successDataResponse(res, "Reward settings fetched successfully", result, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
