import { Op } from "sequelize";
import { sequelize } from "../../../config/db.js";
import Product from "../../../database/models/Product.js";
import Stock from "../../../database/models/Stock.js";
import {
  createExchangeRepo,
  findUserOrderWithDetailRepo,
  findStockByIdRepo,
  describeVariantRepo,
  findExchangeByIdRepo,
  findAllExchangesRepo,
  findExchangesByUserRepo,
  findPendingExchangeForOrderDetailRepo,
  markExchangeSeenRepo,
  updateExchangeRepo,
  deleteExchangeRepo,
} from "../repositories/exchange.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";
import { notifyAdmins } from "../../../shared/services/notifier.service.js";
import { sendMail } from "../../../shared/utils/mailer.js";

// Order status codes, see checkout.service.js's own copy of this comment —
// 0 Pending, 1 Processing, 2 Shipped, 3 Delivered, 4 Completed, 5 Cancelled,
// 6 Returned, 7 Refunded, 8 Failed, 9 On Hold. An exchange only makes sense
// once the item has actually gone out.
const EXCHANGE_ELIGIBLE_STATUSES = [2, 3, 4];

const STATUS_LABELS = { 0: "Pending", 1: "Approved", 2: "Rejected", 3: "Completed" };

export const createExchangeService = async (user, data) => {
  const order = await findUserOrderWithDetailRepo(user.id, data.order_id);
  if (!order) throw new Error("ORDER_NOT_FOUND");
  if (!EXCHANGE_ELIGIBLE_STATUSES.includes(order.status)) throw new Error("ORDER_NOT_ELIGIBLE");

  const orderDetail = order.orderDetails.find((d) => d.id === data.order_detail_id);
  if (!orderDetail) throw new Error("ORDER_DETAIL_NOT_FOUND");

  const existingPending = await findPendingExchangeForOrderDetailRepo(orderDetail.id);
  if (existingPending) throw new Error("EXCHANGE_ALREADY_REQUESTED");

  let requestedStock = null;
  if (data.requested_stock_id) {
    requestedStock = await findStockByIdRepo(data.requested_stock_id);
    if (!requestedStock) throw new Error("REQUESTED_STOCK_NOT_FOUND");
    // Exchanges are scoped to "a different variant of the same product" —
    // swapping for an unrelated product is a new order, not an exchange.
    if (requestedStock.product_id !== orderDetail.product_id) throw new Error("INVALID_REPLACEMENT");
    if (requestedStock.stock_qty !== null && requestedStock.stock_qty <= 0) throw new Error("INSUFFICIENT_STOCK");
  }

  const returnVariant = await describeVariantRepo(orderDetail.color_id, orderDetail.size_id, orderDetail.fitting_id);
  const requestedVariant = requestedStock
    ? await describeVariantRepo(requestedStock.color_id, requestedStock.size_id, requestedStock.fitting_id)
    : null;

  const exchange = await createExchangeRepo({
    order_id: order.id,
    user_id: user.id,
    order_detail_id: orderDetail.id,
    requested_stock_id: requestedStock?.id ?? null,
    order_number: order.order_number,
    customer_name: [user.first_name, user.last_name].filter(Boolean).join(" "),
    email: user.email,
    phone_number: user.phone,
    return_item_code: orderDetail.product?.sku ?? null,
    return_item_name: orderDetail.product?.title ?? null,
    return_item_size: returnVariant,
    required_item_code: requestedStock?.product?.sku ?? null,
    required_item_name: requestedStock?.product?.title ?? orderDetail.product?.title ?? null,
    required_item_size: requestedVariant,
    reason: data.reason,
    other_detail: data.other_detail || null,
    status: 0,
    seen: 0,
  });

  notifyAdmins({
    title: "New exchange request",
    description: `${exchange.customer_name} requested an exchange for order ${order.order_number}`,
    tableName: "exchanges",
    rowId: exchange.id,
  }).catch(() => {});

  return await findExchangeByIdRepo(exchange.id);
};

export const getExchangesService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.seen !== undefined && query.seen !== "") where.seen = query.seen;
  if (query.status !== undefined && query.status !== "") where.status = query.status;
  if (query.search) where.customer_name = { [Op.like]: `%${query.search}%` };

  const { count, rows } = await findAllExchangesRepo({ where, limit, offset });

  return { exchanges: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getMyExchangesService = async (userId, query) => {
  const { page, limit, offset } = getPagination(query);
  const { count, rows } = await findExchangesByUserRepo(userId, { limit, offset });

  return { exchanges: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getExchangeByIdService = async (id) => {
  const exchange = await findExchangeByIdRepo(id);
  if (!exchange) throw new Error("EXCHANGE_NOT_FOUND");
  return exchange;
};

export const getMyExchangeByIdService = async (userId, id) => {
  const exchange = await findExchangeByIdRepo(id);
  if (!exchange || exchange.user_id !== userId) throw new Error("EXCHANGE_NOT_FOUND");
  return exchange;
};

export const markExchangeSeenService = async (id) => {
  const exchange = await findExchangeByIdRepo(id);
  if (!exchange) throw new Error("EXCHANGE_NOT_FOUND");

  return await markExchangeSeenRepo(id);
};

// Approving (only the first time — re-approving an already-approved request
// is a no-op on stock) restores the returned variant/product quantity and,
// if the customer asked for a specific replacement, decrements that variant
// instead. Both sides reuse the same product_id+color_id+size_id+fitting_id
// stock lookup pattern as checkout/cancellation, so it works identically
// whether the product has variants (a T-shirt's size) or none at all (a
// plain kitchen item) — the same code path handles every category.
export const updateExchangeStatusService = async (id, { status, admin_note }) => {
  const exchange = await findExchangeByIdRepo(id);
  if (!exchange) throw new Error("EXCHANGE_NOT_FOUND");

  const isNewlyApproved = status === 1 && exchange.status !== 1;

  await sequelize.transaction(async (transaction) => {
    if (isNewlyApproved) {
      const detail = exchange.orderDetail;

      if (detail) {
        const returnedStock = await Stock.findOne({
          where: {
            product_id: detail.product_id,
            color_id: detail.color_id,
            size_id: detail.size_id,
            fitting_id: detail.fitting_id,
          },
          transaction,
        });

        if (returnedStock) {
          await Stock.update(
            { stock_qty: sequelize.literal(`stock_qty + ${Number(detail.quantity)}`) },
            { where: { id: returnedStock.id }, transaction }
          );
        } else {
          await Product.update(
            { quantity: sequelize.literal(`quantity + ${Number(detail.quantity)}`) },
            { where: { id: detail.product_id }, transaction }
          );
        }
      }

      if (exchange.requested_stock_id) {
        const [affectedCount] = await Stock.update(
          { stock_qty: sequelize.literal(`GREATEST(stock_qty - 1, 0)`) },
          { where: { id: exchange.requested_stock_id, stock_qty: { [Op.gt]: 0 } }, transaction }
        );

        // The requested variant sold out between the customer's request and
        // this approval — bail out (rolling back the whole transaction,
        // including the returned-stock credit above) instead of silently
        // approving an exchange we can no longer fulfil.
        if (affectedCount === 0) {
          throw new Error("REQUESTED_STOCK_OUT_OF_STOCK");
        }
      }
    }

    await updateExchangeRepo(id, { status, admin_note: admin_note || null }, { transaction });
  });

  const updated = await findExchangeByIdRepo(id);

  if (updated.email) {
    sendMail({
      to: updated.email,
      subject: `Your exchange request has been ${STATUS_LABELS[status].toLowerCase()}`,
      html: `<p>Hi ${updated.customer_name},</p><p>Your exchange request for order <strong>${updated.order_number}</strong> has been <strong>${STATUS_LABELS[status]}</strong>.</p>${admin_note ? `<p>Note from our team: ${admin_note}</p>` : ""}`,
    }).catch(() => {});
  }

  return updated;
};

export const deleteExchangeService = async (id) => {
  const exchange = await findExchangeByIdRepo(id);
  if (!exchange) throw new Error("EXCHANGE_NOT_FOUND");

  await deleteExchangeRepo(id);
  return true;
};
