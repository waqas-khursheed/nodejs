import Joi from "joi";

export const subscribeSchema = Joi.object({
  email: Joi.string().trim().email().required(),
});

export const contactFormSchema = Joi.object({
  name: Joi.string().trim().min(2).max(95).required(),
  email: Joi.string().trim().email().max(95).required(),
  phone: Joi.string().trim().max(30).allow(""),
  description: Joi.string().trim().min(2).required(),
});
