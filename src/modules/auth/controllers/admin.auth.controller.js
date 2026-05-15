import { adminLoginService } from "../services/auth.service.js";
import {successDataResponse, errorResponse} from "../../../shared/responses/apiResponse.js";

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