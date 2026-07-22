import Joi from "joi";

export const stockAlertListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  notified: Joi.string().valid("0", "1"),
  search: Joi.string().allow(""),
});

export const stockAlertIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
