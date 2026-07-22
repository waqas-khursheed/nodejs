import Joi from "joi";

export const reviewIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const reviewListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.number().valid(0, 1, 2),
  product_id: Joi.number().integer().positive(),
  search: Joi.string().allow(""),
});

export const reviewStatusSchema = Joi.object({
  status: Joi.number().valid(0, 1, 2).required(),
});
