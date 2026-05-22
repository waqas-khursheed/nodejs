import { AppError } from "../errors/appError.js";

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

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
  // Default Error Response
  // =====================================
  res.status(error.statusCode || 500).json({
    status: false,
    message:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
};