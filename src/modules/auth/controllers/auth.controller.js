import {
  registerUserService,
  loginUserService,
  requestPasswordResetService,
  resetPasswordService,
  changePasswordService,
  getProfileService,
  updateProfileService,
} from "../services/auth.service.js";
import { mergeDeviceCartIntoUserService } from "../../carts/services/cart.service.js";
import { successResponse, successDataResponse
} from "../../../shared/responses/apiResponse.js";

import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  EMAIL_EXISTS: { code: 409, msg: "Email already exists" },
  INVALID_CREDENTIALS: { code: 401, msg: "Invalid email or password" },
  ACCOUNT_INACTIVE: { code: 401, msg: "Account is inactive" },
  USER_NOT_FOUND: { code: 404, msg: "No account found with this email" },
  INVALID_CODE: { code: 422, msg: "Invalid or expired reset code" },
  INVALID_OLD_PASSWORD: { code: 422, msg: "Old password is incorrect" },
};

const handleServiceError = createErrorHandler(errorMap);

export const register = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    await mergeDeviceCartIntoUserService(req.headers["x-device-id"], result.user.id);
    return successDataResponse(res, "User registered successfully", result, 201);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUserService(req.body);
    await mergeDeviceCartIntoUserService(req.headers["x-device-id"], result.user.id);
    return successDataResponse(res, "Login successful", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const result = await requestPasswordResetService(req.body.email);
    return successDataResponse(res, result.message, result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    await resetPasswordService(req.body);
    return successResponse(res, "Password reset successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const changePassword = async (req, res) => {
  try {
    await changePasswordService(req.user.id, req.body);
    return successResponse(res, "Password changed successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const result = await getProfileService(req.user.id);
    return successDataResponse(res, "Profile fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const result = await updateProfileService(req.user.id, req.body);
    return successDataResponse(res, "Profile updated successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
