import Joi from "joi";

export const commonPageIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const commonPageListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.number().valid(0, 1),
  page_name: Joi.string().allow(""),
});

export const createCommonPageSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required(),
  heading: Joi.string().trim().max(150).allow(""),
  content: Joi.string().trim().min(1).required(),
  status: Joi.number().valid(0, 1).default(1),
  page_name: Joi.string().trim().lowercase().min(2).max(100).required(),
});

export const updateCommonPageSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150),
  heading: Joi.string().trim().max(150).allow(""),
  content: Joi.string().trim().min(1),
  status: Joi.number().valid(0, 1),
  page_name: Joi.string().trim().lowercase().min(2).max(100),
}).min(1);
