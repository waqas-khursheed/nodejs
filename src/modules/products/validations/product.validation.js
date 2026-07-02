import Joi from "joi";

const idOrCsv = Joi.alternatives().try(
  Joi.array().items(Joi.number().integer().positive()),
  Joi.string().allow("")
);

export const productSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  short_desc: Joi.string().allow("", null),
  long_desc: Joi.string().allow("", null),
  features: Joi.string().allow("", null),
  inside_box: Joi.string().allow("", null),

  price: Joi.number().positive().required(),
  d_price: Joi.number().min(0).default(0),
  d_percentage: Joi.number().min(0).max(100).default(0),
  dis_start_date: Joi.date().allow("", null),
  dis_end_date: Joi.date().allow("", null),

  quantity: Joi.number().integer().min(0).required(),
  sku: Joi.string().max(255).allow("", null),
  status: Joi.number().valid(0, 1).required(),

  video_1: Joi.string().allow("", null),
  video_2: Joi.string().allow("", null),

  featured_image_alt: Joi.string().allow("", null),
  featured_image_title: Joi.string().allow("", null),
  hovered_image_alt: Joi.string().allow("", null),
  hovered_image_title: Joi.string().allow("", null),
  size_chart_alt: Joi.string().allow("", null),
  size_chart_title: Joi.string().allow("", null),

  brand_id: Joi.number().integer().positive().allow(null, ""),
  category_ids: idOrCsv,

  is_variation: Joi.boolean().truthy(1, "1").falsy(0, "0").default(false),
  is_prescription: Joi.boolean().truthy(1, "1").falsy(0, "0").default(false),

  weight: Joi.number().min(0).allow(null, ""),
  new_arrival: Joi.number().valid(0, 1).default(0),
  best_seller: Joi.number().valid(0, 1).default(0),

  meta_keywords: Joi.string().max(255).allow("", null),
  meta_description: Joi.string().max(255).allow("", null),
});

export const updateProductSchema = Joi.object({
  title: Joi.string().min(2).max(255),
  short_desc: Joi.string().allow("", null),
  long_desc: Joi.string().allow("", null),
  features: Joi.string().allow("", null),
  inside_box: Joi.string().allow("", null),

  price: Joi.number().positive(),
  d_price: Joi.number().min(0),
  d_percentage: Joi.number().min(0).max(100),
  dis_start_date: Joi.date().allow("", null),
  dis_end_date: Joi.date().allow("", null),

  quantity: Joi.number().integer().min(0),
  sku: Joi.string().max(255).allow("", null),
  status: Joi.number().valid(0, 1),

  video_1: Joi.string().allow("", null),
  video_2: Joi.string().allow("", null),

  featured_image_alt: Joi.string().allow("", null),
  featured_image_title: Joi.string().allow("", null),
  hovered_image_alt: Joi.string().allow("", null),
  hovered_image_title: Joi.string().allow("", null),
  size_chart_alt: Joi.string().allow("", null),
  size_chart_title: Joi.string().allow("", null),

  brand_id: Joi.number().integer().positive().allow(null, ""),
  category_ids: idOrCsv,

  is_variation: Joi.boolean().truthy(1, "1").falsy(0, "0"),
  is_prescription: Joi.boolean().truthy(1, "1").falsy(0, "0"),

  weight: Joi.number().min(0).allow(null, ""),
  new_arrival: Joi.number().valid(0, 1),
  best_seller: Joi.number().valid(0, 1),

  meta_keywords: Joi.string().max(255).allow("", null),
  meta_description: Joi.string().max(255).allow("", null),
}).min(1);

export const productIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const galleryIdParamSchema = Joi.object({
  galleryId: Joi.number().integer().positive().required(),
});

export const productListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
  status: Joi.number().valid(0, 1),
  brand_id: Joi.number().integer().positive(),
});
