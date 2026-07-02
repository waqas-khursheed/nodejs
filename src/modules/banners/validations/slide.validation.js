import Joi from "joi";

export const slideSchema = Joi.object({
  status: Joi.number().valid(0, 1).required(),
  Heading: Joi.string().max(255).allow("", null),
  bullet_1: Joi.string().max(255).allow("", null),
  bullet_2: Joi.string().max(255).allow("", null),
  bullet_3: Joi.string().max(255).allow("", null),
  link: Joi.string().allow("", null),
});

export const updateSlideSchema = Joi.object({
  status: Joi.number().valid(0, 1),
  Heading: Joi.string().max(255).allow("", null),
  bullet_1: Joi.string().max(255).allow("", null),
  bullet_2: Joi.string().max(255).allow("", null),
  bullet_3: Joi.string().max(255).allow("", null),
  link: Joi.string().allow("", null),
}).min(1);

export const slideIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const slideListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.number().valid(0, 1),
});
