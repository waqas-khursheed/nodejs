import Joi from "joi";

export const upsertAddressSchema = Joi.object({
  address1: Joi.string().trim().max(200),
  country_id1: Joi.number().integer().positive(),
  state_id1: Joi.number().integer().positive(),
  city_id1: Joi.number().integer().positive(),
  code1: Joi.string().trim().max(200),

  address2: Joi.string().trim().max(200).allow(""),
  country_id2: Joi.number().integer().positive(),
  state_id2: Joi.number().integer().positive(),
  city_id2: Joi.number().integer().positive(),
  code2: Joi.string().trim().max(200).allow(""),
}).min(1);
