import Joi from "joi";

export const couponSchema = Joi.object({
  code: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Coupon code is required",
  }),
  percentage: Joi.number().positive().max(100).required(),
  status: Joi.number().valid(0, 1).required(),
  to_all: Joi.number().valid(0, 1).default(1),
  category_ids: Joi.array().items(Joi.number().integer().positive()).default([]),
});

export const updateCouponSchema = Joi.object({
  code: Joi.string().min(3).max(50),
  percentage: Joi.number().positive().max(100),
  status: Joi.number().valid(0, 1),
  to_all: Joi.number().valid(0, 1),
  category_ids: Joi.array().items(Joi.number().integer().positive()),
}).min(1);

export const couponIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const couponListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  status: Joi.number().valid(0, 1),
});
