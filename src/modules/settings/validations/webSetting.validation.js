import Joi from "joi";

export const updateWebSettingSchema = Joi.object({
  website_link: Joi.string().uri().allow(""),
  website_name: Joi.string().trim().max(150).allow(""),
  meta_keywords: Joi.string().trim().allow(""),
  meta_description: Joi.string().trim().allow(""),
  address: Joi.string().trim().max(255).allow(""),
  email: Joi.string().email().max(95).allow(""),
  phone_one: Joi.string().trim().max(25).allow(""),
  phone_two: Joi.string().trim().max(25).allow(""),
  copyright: Joi.string().trim().max(150).allow(""),
  facebook: Joi.string().uri().allow(""),
  instagram: Joi.string().uri().allow(""),
  twitter: Joi.string().uri().allow(""),
  youtube: Joi.string().uri().allow(""),
  delivery_days: Joi.string().trim().allow(""),
  // .empty("") makes a blank field behave as "not sent" rather than a
  // validation failure — Joi then omits the key from its output entirely
  // (no .default()), so the `validate` middleware's `req.body = value`
  // leaves these keys out of req.body, and the service's partial
  // `WebSetting.update(data, ...)` just leaves the existing DB value
  // untouched instead of erroring or nulling it out.
  delivery_start_time: Joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/).empty(""),
  delivery_end_time: Joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/).empty(""),
  min_amount_for_free_delivery: Joi.number().integer().min(0).empty(""),
  shipping_rate: Joi.number().integer().min(0).empty(""),
  location_mod: Joi.number().integer().valid(0, 1),
  delivery_days_time_mod: Joi.number().integer().valid(0, 1),
});
// Note: no .min(1) — this endpoint also accepts file-only updates (logos),
// which arrive via req.files rather than req.body.
