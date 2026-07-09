import Joi from "joi";

export const faqIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const faqListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  category_id: Joi.number().integer().positive(),
});

export const createFaqSchema = Joi.object({
  question: Joi.string().trim().min(5).max(255).required(),
  answer: Joi.string().trim().min(2).required(),
  category_id: Joi.number().integer().positive().required(),
});

export const updateFaqSchema = Joi.object({
  question: Joi.string().trim().min(5).max(255),
  answer: Joi.string().trim().min(2),
  category_id: Joi.number().integer().positive(),
}).min(1);
