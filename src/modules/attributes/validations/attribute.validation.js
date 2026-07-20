import Joi from "joi";

export const attributeSchema = Joi.object({
  attribute_title: Joi.string().min(2).max(255).required().messages({
    "string.empty": "Attribute title is required",
    "string.min": "Attribute title must be at least 2 characters",
  }),
});

export const updateAttributeSchema = Joi.object({
  attribute_title: Joi.string().min(2).max(255).required(),
});

export const attributeIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const attributeListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
});

// -------- Attribute Items --------

export const attributeItemSchema = Joi.object({
  title: Joi.string().min(1).max(255).required().messages({
    "string.empty": "Title is required",
  }),

  attribute_id: Joi.number().integer().positive().required().messages({
    "any.required": "attribute_id is required",
  }),

  order_by: Joi.number().integer(),
});

export const updateAttributeItemSchema = Joi.object({
  title: Joi.string().min(1).max(255),
  attribute_id: Joi.number().integer().positive(),
  order_by: Joi.number().integer(),
}).min(1);

export const attributeItemIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const attributeItemListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  attribute_id: Joi.number().integer().positive(),
  search: Joi.string().allow(""),
});
