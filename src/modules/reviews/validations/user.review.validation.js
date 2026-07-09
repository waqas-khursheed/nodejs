import Joi from "joi";

export const createReviewSchema = Joi.object({
  product_id: Joi.number().integer().positive().required(),
  review: Joi.string().trim().min(2).max(2000).required(),
  rate: Joi.number().integer().min(1).max(5).required(),
});

export const productIdParamSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
});

export const reviewListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
