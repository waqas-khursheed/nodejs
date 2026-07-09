import Order from "../../../database/models/Order.js";
import OrderDetail from "../../../database/models/OrderDetail.js";
import BillingDetail from "../../../database/models/BillingDetail.js";
import Product from "../../../database/models/Product.js";

const detailIncludes = [
  { model: OrderDetail, as: "orderDetails", include: [{ model: Product, as: "product" }] },
  { model: BillingDetail, as: "billingDetails" },
];

export const createOrderRepo = async (data) => {
  return await Order.create(data);
};

export const createOrderDetailsRepo = async (rows) => {
  return await OrderDetail.bulkCreate(rows);
};

export const createBillingDetailRepo = async (data) => {
  return await BillingDetail.create(data);
};

export const findUserOrderByIdRepo = async (userId, orderId) => {
  return await Order.findOne({ where: { id: orderId, user_id: userId }, include: detailIncludes });
};

export const findUserOrdersRepo = async (userId, { limit, offset }) => {
  return await Order.findAndCountAll({
    where: { user_id: userId },
    limit,
    offset,
    distinct: true,
    include: [{ model: OrderDetail, as: "orderDetails", include: [{ model: Product, as: "product" }] }],
    order: [["id", "DESC"]],
  });
};
