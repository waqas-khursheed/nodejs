import Joi from "joi";

export const createExchangeSchema = Joi.object({
  order_number: Joi.string().trim().max(150).allow(""),
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
