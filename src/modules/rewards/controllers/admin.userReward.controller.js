import {
  getUserRewardsService,
  getUserRewardByIdService,
} from "../services/userReward.service.js";
import { successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const listUserRewards = async (req, res) => {
  try {
    const result = await getUserRewardsService(req.query);
    return successDataResponse(res, "User rewards fetched successfully", result, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const getUserReward = async (req, res) => {
  try {
    const result = await getUserRewardByIdService(req.params.id);
    return successDataResponse(res, "User reward fetched successfully", result, 200);
  } catch (error) {
    if (error.message === "USER_REWARD_NOT_FOUND") {
      return errorResponse(res, "User reward not found", 404);
    }
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
