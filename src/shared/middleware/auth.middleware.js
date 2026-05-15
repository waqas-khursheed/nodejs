import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";
import { errorResponse } from "../../shared/responses/apiResponse.js";

/**
 * =====================================
 * AUTH MIDDLEWARE
 * =====================================
 */
export const authMiddleware = async (req, res, next) => {
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
    // FIND USER
    // =====================================
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return errorResponse(
        res,
        "Unauthorized",
        401,
        {
          user: "User not found",
        }
      );
    }

    // =====================================
    // CHECK USER ACTIVE
    // =====================================
    if (!user.is_active) {
      return errorResponse(
        res,
        "Unauthorized",
        401,
        {
          user: "Account is inactive",
        }
      );
    }

    // =====================================
    // ATTACH USER TO REQUEST
    // =====================================
    req.user = user;

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