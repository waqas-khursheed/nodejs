import Joi from "joi";

export const registerSchema = Joi.object({
  first_name: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),

  last_name: Joi.string().allow(null, ""),

  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),

  phone: Joi.string().required().messages({
    "string.empty": "Phone is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),

  type: Joi.string().allow(null, ""),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});