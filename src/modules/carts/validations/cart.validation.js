import Joi from "joi";

export const addToCartSchema = Joi.object({
  product_id: Joi.number().integer().positive().required(),
  stock_id: Joi.number().integer().positive(),
  quantity: Joi.number().integer().min(1).default(1),
});

export const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

export const cartIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
