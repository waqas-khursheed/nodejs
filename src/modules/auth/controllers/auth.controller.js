import { registerUserService, loginUserService } from "../services/auth.service.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import {successDataResponse,errorResponse} from "../../../shared/responses/apiResponse.js";

export const register = async (req, res) => {
  // =========================
  // DEBUG
  // =========================
  console.log("BODY:", req.body);

  // =========================
  // VALIDATION LAYER (ALL ERRORS)
  // =========================
  const { error } = registerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((err) => err.message);

    return errorResponse(res, "Validation Failed", 422, errors);
  }

  try {
    // =========================
    // SERVICE LAYER
    // =========================
    const result = await registerUserService(req.body);

    return successDataResponse(
      res,
      "User registered successfully",
      result,
      201
    );
  } catch (err) {

    // =========================
    // ERROR MAPPING LAYER
    // =========================
    const errorMap = {
      EMAIL_EXISTS: {
        field: "email",
        msg: "Email already exists",
        code: 409,
      },
      INVALID_CREDENTIALS: {
        field: "email",
        msg: "Invalid credentials",
        code: 401,
      },
    };  

    const mappedError = errorMap[err.message];

    if (mappedError) {
      const errors = {
        [mappedError.field]: mappedError.msg,
      };

      return errorResponse(
        res,
        "Validation Failed",
        mappedError.code,
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


export const login = async (req, res) => {
  try {
    // =========================
    // VALIDATION
    // =========================
    const { error } = loginSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);

      return errorResponse(res, "Validation Failed", 422, errors);
    }

    // =========================
    // SERVICE LAYER
    // =========================
    const result = await loginUserService(req.body);

    return successDataResponse(
      res,
      "Login successful",
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