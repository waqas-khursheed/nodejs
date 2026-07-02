import jwt from "jsonwebtoken";
import Admin from "../../database/models/Admin.js";
import { errorResponse } from "../../shared/responses/apiResponse.js";

/**
 * =====================================
 * ADMIN AUTH MIDDLEWARE
 * =====================================
 */
export const adminAuthMiddleware = async (req, res, next) => {
  try {
    // =====================================
    // GET AUTH HEADER
    // =====================================
    const authHeader = req.headers.authorization;

    // =====================================
    // CHECK TOKEN EXISTS
    // =====================================
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(
        res,
        "Unauthorized",
        401,
        {
          token: "Access token is required",
        }
      );
    }

    // =====================================
    // EXTRACT TOKEN
    // =====================================
    const token = authHeader.split(" ")[1];

    // =====================================
    // VERIFY TOKEN
    // =====================================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // =====================================
    // FIND ADMIN
    // =====================================
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return errorResponse(
        res,
        "Unauthorized",
        401,
        {
          admin: "Admin not found",
        }
      );
    }

    // =====================================
    // CHECK ADMIN ACTIVE (optional)
    // =====================================
    if (!admin.is_active) {
      return errorResponse(
        res,
        "Unauthorized",
        401,
        {
          admin: "Admin account is inactive",
        }
      );
    }

    // =====================================
    // ATTACH ADMIN TO REQUEST
    // =====================================
    req.admin = admin;

    next();

  } catch (err) {

    // =====================================
    // JWT ERRORS
    // =====================================
    if (err.name === "TokenExpiredError") {
      return errorResponse(
        res,
        "Unauthorized",
        401,
        {
          token: "Token expired",
        }
      );
    }

    if (err.name === "JsonWebTokenError") {
      return errorResponse(
        res,
        "Unauthorized",
        401,
        {
          token: "Invalid token",
        }
      );
    }

    // =====================================
    // DEFAULT ERROR
    // =====================================
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