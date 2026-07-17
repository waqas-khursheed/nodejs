import Joi from "joi";

export const createAdminSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
  }),
  is_admin: Joi.number().valid(0, 1).default(0),
});

export const adminIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const adminListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
