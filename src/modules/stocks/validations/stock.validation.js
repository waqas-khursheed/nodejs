import Joi from "joi";

export const stockSchema = Joi.object({
  product_id: Joi.number().integer().positive().required(),
  stock_qty: Joi.number().integer().min(0).allow(null),
  stock_dis_price: Joi.number().min(0).default(0),
  stock_dis_percentage: Joi.number().min(0).max(100).default(0),
  stock_dis_from_date: Joi.date().allow("", null),
  stock_dis_to_date: Joi.date().allow("", null),
  stock_dis_from_time: Joi.string().allow("", null),
  stock_dis_to_time: Joi.string().allow("", null),
  stock_price: Joi.number().min(0).allow(null),
  weight: Joi.number().min(0).allow(null),
  color_id: Joi.number().integer().positive().allow(null),
  size_id: Joi.number().integer().positive().allow(null),
  fitting_id: Joi.number().integer().positive().allow(null),
});

export const updateStockSchema = Joi.object({
  product_id: Joi.number().integer().positive(),
  stock_qty: Joi.number().integer().min(0).allow(null),
  stock_dis_price: Joi.number().min(0),
  stock_dis_percentage: Joi.number().min(0).max(100),
  stock_dis_from_date: Joi.date().allow("", null),
  stock_dis_to_date: Joi.date().allow("", null),
  stock_dis_from_time: Joi.string().allow("", null),
  stock_dis_to_time: Joi.string().allow("", null),
  stock_price: Joi.number().min(0).allow(null),
  weight: Joi.number().min(0).allow(null),
  color_id: Joi.number().integer().positive().allow(null),
  size_id: Joi.number().integer().positive().allow(null),
  fitting_id: Joi.number().integer().positive().allow(null),
}).min(1);

export const stockIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const stockListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  product_id: Joi.number().integer().positive(),
});
