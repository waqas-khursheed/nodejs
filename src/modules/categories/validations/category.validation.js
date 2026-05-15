import Joi from "joi";

export const categorySchema = Joi.object({
  title: Joi.string().min(2).max(255).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 2 characters",
  }),

  description: Joi.string().allow("", null),

  meta_title: Joi.string().max(255).allow("", null),

  meta_keywords: Joi.string().allow("", null),

  meta_desc: Joi.string().allow("", null),

  parent_id: Joi.number().integer().default(0),

  status: Joi.number().valid(0, 1).required().messages({
    "any.only": "Status must be 0 or 1",
  }),

  order_by: Joi.number().integer().default(0),

  is_size_chart: Joi.boolean().default(false),
});


export const updateCategorySchema = Joi.object({
  id: Joi.number().required(),

  title: Joi.string().min(2).max(255).required(),

  description: Joi.string().allow("", null),

  meta_title: Joi.string().allow("", null),

  meta_keywords: Joi.string().allow("", null),

  meta_desc: Joi.string().allow("", null),

  parent_id: Joi.number().integer().default(0),

  status: Joi.number().valid(0, 1),

  order_by: Joi.number().integer(),

  is_size_chart: Joi.boolean(),
});