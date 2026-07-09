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
  footer_widget_1: Joi.string().trim().max(25).allow(""),
  footer_widget_2: Joi.string().trim().max(25).allow(""),
  footer_widget_3: Joi.string().trim().max(25).allow(""),
  footer_widget_4: Joi.string().trim().max(25).allow(""),
  service_for: Joi.string().trim().max(50),
  dynamic_module_name: Joi.string().trim().max(50),
  delivery_days: Joi.string().trim().allow(""),
  delivery_start_time: Joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/),
  delivery_end_time: Joi.string().pattern(/^\d{2}:\d{2}(:\d{2})?$/),
  min_amount_for_free_delivery: Joi.number().integer().min(0),
  shipping_rate: Joi.number().integer().min(0),
  location_mod: Joi.number().integer().valid(0, 1),
  delivery_days_time_mod: Joi.number().integer().valid(0, 1),
  footer_payment_logo_mod: Joi.number().integer().valid(0, 1),
});
// Note: no .min(1) — this endpoint also accepts file-only updates (logos),
// which arrive via req.files rather than req.body.
