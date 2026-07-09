import Joi from "joi";

export const registerSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "First name is required",
  }),

  last_name: Joi.string().trim().max(100).allow(null, ""),

  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),

  phone: Joi.string().trim().min(7).max(20).required().messages({
    "string.empty": "Phone is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),

  type: Joi.string().trim().max(50).allow(null, ""),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().trim().email().required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  code: Joi.string().trim().length(6).required(),
  password: Joi.string().min(6).required(),
});

export const changePasswordSchema = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().min(6).required(),
});

export const updateProfileSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(100),
  last_name: Joi.string().trim().max(100).allow(""),
  username: Joi.string().trim().max(100).allow(""),
  phone: Joi.string().trim().min(7).max(20),
  company_name: Joi.string().trim().max(200).allow(""),
}).min(1);
