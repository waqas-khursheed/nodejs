import Joi from "joi";

export const createExchangeSchema = Joi.object({
  order_number: Joi.string().trim().max(150).required().messages({
    "string.empty": "Order number is required",
  }),
  customer_name: Joi.string().trim().min(2).max(150).required(),
  return_item_code: Joi.string().trim().max(150).allow(""),
  return_item_name: Joi.string().trim().max(150).allow(""),
  return_item_size: Joi.string().trim().max(50).allow(""),
  email: Joi.string().trim().email().allow(""),
  phone_number: Joi.string().trim().max(30).allow(""),
  date: Joi.string().trim().allow(""),
  reason: Joi.string().trim().max(2000).allow(""),
  other_detail: Joi.string().trim().max(2000).allow(""),
  required_item_code: Joi.string().trim().max(150).allow(""),
  required_item_name: Joi.string().trim().max(150).allow(""),
  required_item_size: Joi.string().trim().max(50).allow(""),
});

export const exchangeIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const exchangeListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  seen: Joi.number().valid(0, 1),
});
