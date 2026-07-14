import Joi from "joi";

export const tagSchema = Joi.object({
  name: Joi.string().trim().min(2).max(99).required().messages({
    "string.empty": "Tag name is required",
  }),
  meta_title: Joi.string().trim().allow("", null),
  meta_keywords: Joi.string().trim().allow("", null),
  description: Joi.string().trim().allow("", null),
  meta_description: Joi.string().trim().allow("", null),
  body_description: Joi.string().trim().allow("", null),
});

export const updateTagSchema = Joi.object({
  name: Joi.string().trim().min(2).max(99),
  meta_title: Joi.string().trim().allow("", null),
  meta_keywords: Joi.string().trim().allow("", null),
  description: Joi.string().trim().allow("", null),
  meta_description: Joi.string().trim().allow("", null),
  body_description: Joi.string().trim().allow("", null),
}).min(1);

export const tagIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const tagListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
});

export const productIdParamSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
});

export const syncProductTagsSchema = Joi.object({
  tag_ids: Joi.array().items(Joi.number().integer().positive()).default([]),
});

export const syncMetaTagsSchema = Joi.object({
  meta_tags: Joi.array().items(Joi.string().trim().min(1).max(255)).default([]),
});
