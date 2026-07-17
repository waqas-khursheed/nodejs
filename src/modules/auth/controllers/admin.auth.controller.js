import {
  adminLoginService,
  getAdminProfileService,
  updateAdminProfileService,
  changeAdminPasswordService,
  getAdminsService,
  createAdminService,
  toggleAdminStatusService,
  deleteAdminService,
} from "../services/auth.service.js";
import { successResponse, successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";
import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

export const adminLogin = async (req, res) => {
  try {
    const result = await adminLoginService(req.body);

    return successDataResponse(
      res,
      "Admin login successful",
      result,
      200
    );
 } catch (err) {

    // =========================
    // ERROR MAPPING
    // =========================
    const errorMap = {
      INVALID_CREDENTIALS: {
        field: "email",
        msg: "Invalid email or password",
        code: 401,
      },
    };

    const mapped = errorMap[err.message];

    if (mapped) {
      const errors = {
        [mapped.field]: mapped.msg,
      };

      return errorResponse(
        res,
        "Validation Failed",
        mapped.code,
        errors
      );
    }

    // =========================
    // DEFAULT ERROR
    // =========================
    return errorResponse(
      res,
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
      500,
      null
    );
  }
};

// =========================
// ADMIN SELF-SERVICE PROFILE
// =========================
const profileErrorMap = {
  ADMIN_NOT_FOUND: { code: 404, msg: "Admin not found" },
  EMAIL_EXISTS: { code: 409, msg: "That email is already in use by another admin" },
  INVALID_OLD_PASSWORD: { code: 401, msg: "Current password is incorrect" },
};
const handleProfileError = createErrorHandler(profileErrorMap);

export const getAdminProfile = async (req, res) => {
  try {
    const result = await getAdminProfileService(req.admin.id);
    return successDataResponse(res, "Profile fetched successfully", result, 200);
  } catch (error) {
    return handleProfileError(res, error);
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;

    const result = await updateAdminProfileService(req.admin.id, data);
    return successDataResponse(res, "Profile updated successfully", result, 200);
  } catch (error) {
    return handleProfileError(res, error);
  }
};

export const changeAdminPassword = async (req, res) => {
  try {
    await changeAdminPasswordService(req.admin.id, req.body);
    return successResponse(res, "Password changed successfully", 200);
  } catch (error) {
    return handleProfileError(res, error);
  }
};

// =========================
// ADMIN ACCOUNT MANAGEMENT (super admin only)
// =========================
const managementErrorMap = {
  ADMIN_NOT_FOUND: { code: 404, msg: "Admin not found" },
  EMAIL_EXISTS: { code: 409, msg: "An admin with that email already exists" },
  CANNOT_DELETE_SELF: { code: 422, msg: "You can't delete your own admin account" },
};
const handleManagementError = createErrorHandler(managementErrorMap);

export const listAdmins = async (req, res) => {
  try {
    const result = await getAdminsService(req.query);
    return successDataResponse(res, "Admins fetched successfully", result, 200);
  } catch (error) {
    return handleManagementError(res, error);
  }
};

export const createAdmin = async (req, res) => {
  try {
    const result = await createAdminService(req.body);
    return successDataResponse(res, "Admin created successfully", result, 201);
  } catch (error) {
    return handleManagementError(res, error);
  }
};

export const toggleAdminStatus = async (req, res) => {
  try {
    const result = await toggleAdminStatusService(req.params.id);
    return successDataResponse(res, "Admin status updated successfully", result, 200);
  } catch (error) {
    return handleManagementError(res, error);
  }
};

export const removeAdmin = async (req, res) => {
  try {
    await deleteAdminService(req.admin.id, req.params.id);
    return successResponse(res, "Admin deleted successfully", 200);
  } catch (error) {
    return handleManagementError(res, error);
  }
};