import Joi from "joi";

export const brandSchema = Joi.object({
  title: Joi.string().min(2).max(255).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 2 characters",
  }),

  description: Joi.string().allow("", null),

  status: Joi.number().valid(0, 1).required().messages({
    "any.only": "Status must be 0 or 1",
  }),
});

export const updateBrandSchema = Joi.object({
  title: Joi.string().min(2).max(255),
  description: Joi.string().allow("", null),
  status: Joi.number().valid(0, 1),
}).min(1);

export const brandIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const brandListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  status: Joi.number().valid(0, 1),
});
