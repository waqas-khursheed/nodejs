import Joi from "joi";

export const productListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  search: Joi.string().trim().allow(""),
  category: Joi.string().trim().allow(""),
  brand: Joi.string().trim().allow(""),
  tag: Joi.string().trim().allow(""),
  min_price: Joi.number().min(0),
  max_price: Joi.number().min(0),
  new_arrival: Joi.number().valid(0, 1),
  best_seller: Joi.number().valid(0, 1),
  sale: Joi.number().valid(0, 1),
  sort: Joi.string().valid("newest", "price_asc", "price_desc", "best_selling"),
});

export const productSlugParamSchema = Joi.object({
  slug: Joi.string().trim().min(1).required(),
});

export const relatedProductsQuerySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(20).default(8),
});

export const stockCheckQuerySchema = Joi.object({
  size_id: Joi.number().integer().positive(),
  color_id: Joi.number().integer().positive(),
  fitting_id: Joi.number().integer().positive(),
});
