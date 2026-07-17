import rateLimit from "express-rate-limit";
import { errorResponse } from "../responses/apiResponse.js";

const handler = (req, res) => {
  return errorResponse(res, "Too many requests, please try again later", 429);
};

// =====================================
// GENERAL API LIMITER (applied globally)
// =====================================
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

// =====================================
// STRICT LIMITER (login / register — brute-force protection)
// =====================================
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

// =====================================
// PUBLIC FORM LIMITER (exchange requests, contact-us, newsletter signup —
// unauthenticated write endpoints with no other abuse protection)
// =====================================
export const publicFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});
