import Exchange from "../../../database/models/Exchange.js";
import Order from "../../../database/models/Order.js";
import BillingDetail from "../../../database/models/BillingDetail.js";
import User from "../../../database/models/User.js";

export const createExchangeRepo = async (data) => {
  return await Exchange.create(data);
};

export const findOrderByNumberRepo = async (orderNumber) => {
  return await Order.findOne({
    where: { order_number: orderNumber },
    include: [
      { model: BillingDetail, as: "billingDetails" },
      { model: User, as: "user", attributes: ["id", "email"] },
    ],
  });
};

const detailIncludes = [{ model: Order, as: "order", attributes: ["id", "order_number", "status", "grand_total"] }];

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

export const markExchangeSeenRepo = async (id) => {
  await Exchange.update({ seen: 1 }, { where: { id } });
  return await findExchangeByIdRepo(id);
};

export const deleteExchangeRepo = async (id) => {
  return await Exchange.destroy({ where: { id } });
};
