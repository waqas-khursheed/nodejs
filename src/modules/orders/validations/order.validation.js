import Joi from "joi";

export const orderIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const orderListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  status: Joi.number().integer().min(0),
  payment_status: Joi.string().valid("pending", "paid", "failed", "refunded"),
  user_id: Joi.number().integer().positive(),
});

export const orderStatusSchema = Joi.object({
  status: Joi.number().integer().min(0).max(9).required(),
});

export const orderPaymentStatusSchema = Joi.object({
  payment_status: Joi.string().valid("pending", "paid", "failed", "refunded").required(),
});
