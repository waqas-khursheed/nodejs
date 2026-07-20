import Joi from "joi";

// order_id/order_detail_id are real references now (not free-text order
// number/item name) — the exchange always points at a line item the
// requesting user actually bought. requested_stock_id is optional: not
// every exchange has a same-product replacement (e.g. a plain refund/return).
export const createExchangeSchema = Joi.object({
  order_id: Joi.number().integer().positive().required(),
  order_detail_id: Joi.number().integer().positive().required(),
  requested_stock_id: Joi.number().integer().positive().allow(null),
  reason: Joi.string().trim().min(2).max(2000).required().messages({
    "string.empty": "Please tell us why you'd like to exchange this item",
  }),
  other_detail: Joi.string().trim().max(2000).allow(""),
});

// 1 Approved, 2 Rejected, 3 Completed — admin can't set it back to 0
// (Pending) through this endpoint, that's just the natural creation state.
export const updateExchangeStatusSchema = Joi.object({
  status: Joi.number().integer().valid(1, 2, 3).required(),
  admin_note: Joi.string().trim().max(2000).allow(""),
});

export const exchangeIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

export const exchangeListQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  seen: Joi.number().valid(0, 1),
  status: Joi.number().valid(0, 1, 2, 3),
});
