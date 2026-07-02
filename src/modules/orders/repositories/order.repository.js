import { Op } from "sequelize";
import Order from "../../../database/models/Order.js";
import OrderDetail from "../../../database/models/OrderDetail.js";
import BillingDetail from "../../../database/models/BillingDetail.js";
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

export const deleteOrderRepo = async (id) => {
  return await Order.destroy({ where: { id } });
};
