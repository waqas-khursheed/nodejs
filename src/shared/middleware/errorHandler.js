import { AppError } from "../errors/AppError.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (!err.isOperational) {
    logger.error(`Unhandled error on ${req.method} ${req.originalUrl}`, {
      error: err.message,
      stack: err.stack,
    });
  }

  // =====================================
  // Sequelize: Model Not Found / Invalid ID
  // =====================================
  if (err.name === "SequelizeEmptyResultError") {
    error = new AppError("Record not found", 404);
  }

  // =====================================
  // Sequelize Validation Error
  // =====================================
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      status: false,
      message: err.errors[0].message,
    });
  }

  // =====================================
  // JWT Errors
  // =====================================
  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    error = new AppError("Token expired", 401);
  }

  // =====================================
  // Wrong HTTP Method
  // =====================================
  if (err.status === 405) {
    error = new AppError("Wrong HTTP method", 405);
  }

  // =====================================
  // Multer (file upload) Errors
  // =====================================
  if (err.name === "MulterError") {
    const multerMessages = {
      LIMIT_FILE_SIZE: "File is too large. Maximum allowed size is 5MB.",
      LIMIT_FILE_COUNT: "Too many files uploaded.",
      LIMIT_UNEXPECTED_FILE: "Unexpected file field.",
    };

    error = new AppError(
      multerMessages[err.code] || "File upload error",
      400
    );
  }

  // =====================================
  // Default Error Response
  // =====================================
  const message = error.isOperational
    ? error.message
    : process.env.NODE_ENV === "development"
    ? error.message
    : "Something went wrong";

  res.status(error.statusCode || 500).json({
    status: false,
    message,
  });
};