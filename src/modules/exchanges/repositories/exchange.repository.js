import Exchange from "../../../database/models/Exchange.js";
import Order from "../../../database/models/Order.js";
import OrderDetail from "../../../database/models/OrderDetail.js";
import Product from "../../../database/models/Product.js";
import Stock from "../../../database/models/Stock.js";
import AttributeItem from "../../../database/models/AttributeItem.js";

export const createExchangeRepo = async (data) => {
  return await Exchange.create(data);
};

// Order ownership is enforced by the caller (createExchangeService) via
// this `user_id` filter — a customer can only file an exchange against
// their own order.
export const findUserOrderWithDetailRepo = async (userId, orderId) => {
  return await Order.findOne({
    where: { id: orderId, user_id: userId },
    include: [{ model: OrderDetail, as: "orderDetails", include: [{ model: Product, as: "product" }] }],
  });
};

export const findStockByIdRepo = async (id) => {
  return await Stock.findByPk(id, { include: [{ model: Product, as: "product" }] });
};

export const describeVariantRepo = async (colorId, sizeId, fittingId) => {
  const ids = [colorId, sizeId, fittingId].filter(Boolean);
  if (ids.length === 0) return null;

  const items = await AttributeItem.findAll({ where: { id: ids } });
  return items.map((i) => i.title).join(" / ") || null;
};

const detailIncludes = [
  { model: Order, as: "order", attributes: ["id", "order_number", "status", "grand_total"] },
  {
    model: OrderDetail,
    as: "orderDetail",
    include: [{ model: Product, as: "product", attributes: ["id", "title", "slug", "featured_image"] }],
  },
  {
    model: Stock,
    as: "requestedStock",
    include: [{ model: Product, as: "product", attributes: ["id", "title", "slug", "featured_image"] }],
  },
];

export const findExchangeByIdRepo = async (id) => {
  return await Exchange.findByPk(id, { include: detailIncludes });
};

export const findAllExchangesRepo = async ({ where, limit, offset }) => {
  return await Exchange.findAndCountAll({
    where,
    limit,
    offset,
    include: detailIncludes,
    order: [["id", "DESC"]],
  });
};

export const findExchangesByUserRepo = async (userId, { limit, offset }) => {
  return await Exchange.findAndCountAll({
    where: { user_id: userId },
    limit,
    offset,
    include: detailIncludes,
    order: [["id", "DESC"]],
  });
};

// One open (Pending) request per line item — stops a customer from spamming
// duplicate exchange requests for the same order_detail while one is still
// being reviewed.
export const findPendingExchangeForOrderDetailRepo = async (orderDetailId) => {
  return await Exchange.findOne({ where: { order_detail_id: orderDetailId, status: 0 } });
};

export const markExchangeSeenRepo = async (id) => {
  await Exchange.update({ seen: 1 }, { where: { id } });
  return await findExchangeByIdRepo(id);
};

export const updateExchangeRepo = async (id, data, options = {}) => {
  await Exchange.update(data, { where: { id }, ...options });
};

export const deleteExchangeRepo = async (id) => {
  return await Exchange.destroy({ where: { id } });
};
