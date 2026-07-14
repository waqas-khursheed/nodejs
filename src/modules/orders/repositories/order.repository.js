import { Op } from "sequelize";
import Order from "../../../database/models/Order.js";
import OrderDetail from "../../../database/models/OrderDetail.js";
import BillingDetail from "../../../database/models/BillingDetail.js";
import OrderStatusHistory from "../../../database/models/OrderStatusHistory.js";
import Admin from "../../../database/models/Admin.js";
import Product from "../../../database/models/Product.js";
import User from "../../../database/models/User.js";

const detailIncludes = [
  { model: User, as: "user", attributes: ["id", "first_name", "last_name", "email", "phone"] },
  {
    model: OrderDetail,
    as: "orderDetails",
    include: [{ model: Product, as: "product" }],
  },
  { model: BillingDetail, as: "billingDetails" },
  {
    model: OrderStatusHistory,
    as: "statusHistory",
    include: [{ model: Admin, as: "changedByAdmin", attributes: ["id", "name"] }],
    separate: true,
    order: [["created_at", "DESC"]],
  },
];

export const findOrderByIdRepo = async (id, withRelations = false) => {
  return await Order.findByPk(id, { include: withRelations ? detailIncludes : [] });
};

export const findAllOrdersRepo = async ({ where, limit, offset }) => {
  return await Order.findAndCountAll({
    where,
    limit,
    offset,
    distinct: true,
    include: [{ model: User, as: "user", attributes: ["id", "first_name", "last_name", "email"] }],
    order: [["id", "DESC"]],
  });
};

export const updateOrderRepo = async (id, data) => {
  await Order.update(data, { where: { id } });
  return await findOrderByIdRepo(id, true);
};

// Write-only variant (no self re-read) for use inside a transaction — see
// the equivalent note in coupon.repository.js.
export const updateOrderFieldsRepo = async (id, data, options = {}) => {
  await Order.update(data, { where: { id }, ...options });
};

export const createOrderStatusHistoryRepo = async (
  { orderId, field, fromValue, toValue, changedByAdminId },
  options = {}
) => {
  return await OrderStatusHistory.create(
    {
      order_id: orderId,
      field,
      from_value: fromValue !== undefined && fromValue !== null ? String(fromValue) : null,
      to_value: String(toValue),
      changed_by_admin_id: changedByAdminId ?? null,
    },
    options
  );
};

export const deleteOrderRepo = async (id) => {
  return await Order.destroy({ where: { id } });
};
