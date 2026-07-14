import {
  getUsersService,
  getUserByIdService,
  toggleUserStatusService,
  deleteUserService,
} from "../services/user.service.js";
import {
  successResponse,
  successDataResponse,
  } from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  USER_NOT_FOUND: { code: 404, msg: "User not found" },
};

const handleServiceError = createErrorHandler(errorMap);

export const listUsers = async (req, res) => {
  try {
    const result = await getUsersService(req.query);

    return successDataResponse(res, "Users fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await getUserByIdService(req.params.id);

    return successDataResponse(res, "User fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const result = await toggleUserStatusService(req.params.id);

    return successDataResponse(res, "User status updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.id);

    return successResponse(res, "User deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
