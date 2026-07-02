import Joi from "joi";

export const userIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const userListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  is_active: Joi.number().valid(0, 1),
});
