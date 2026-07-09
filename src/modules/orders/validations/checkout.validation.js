import Joi from "joi";

const billingSchema = Joi.object({
  firstname: Joi.string().trim().min(2).max(150).required(),
  lastname: Joi.string().trim().max(150).allow(""),
  email: Joi.string().trim().email().allow(""),
  phone: Joi.string().trim().max(30).allow(""),
  company: Joi.string().trim().max(150).allow(""),
  address_1: Joi.string().trim().min(2).max(500).required(),
  address_2: Joi.string().trim().max(500).allow(""),
  city: Joi.string().trim().min(1).max(100).required(),
  postcode: Joi.string().trim().max(20).allow(""),
  country: Joi.string().trim().min(1).max(100).required(),
  state: Joi.string().trim().min(1).max(50).required(),
});

export const checkoutSchema = Joi.object({
  pay_method: Joi.string().trim().valid("cod", "card").required(),
  billing: billingSchema.required(),
  coupon_code: Joi.string().trim().allow(""),
  card_no: Joi.number().integer(),
  use_reward: Joi.boolean().default(false),
  delivery_day: Joi.string().trim().max(50).allow(""),
  delivery_start_time: Joi.string().trim().allow(""),
  delivery_end_time: Joi.string().trim().allow(""),
  type: Joi.string().trim().max(50).allow(""),
});

export const orderIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const orderListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
