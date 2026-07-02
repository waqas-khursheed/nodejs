import { Op } from "sequelize";
import {
  findOrderByIdRepo,
  findAllOrdersRepo,
  updateOrderRepo,
  deleteOrderRepo,
} from "../repositories/order.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const getOrdersService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.status !== undefined && query.status !== "") {
    where.status = query.status;
  }

  if (query.payment_status) {
    where.payment_status = query.payment_status;
  }

  if (query.user_id) {
    where.user_id = query.user_id;
  }

  if (query.search) {
    where.order_number = { [Op.like]: `%${query.search}%` };
  }

  const { count, rows } = await findAllOrdersRepo({ where, limit, offset });

  return { orders: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getOrderByIdService = async (id) => {
  const order = await findOrderByIdRepo(id, true);
  if (!order) throw new Error("ORDER_NOT_FOUND");
  return order;
};

export const updateOrderStatusService = async (id, status) => {
  const order = await findOrderByIdRepo(id);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  return await updateOrderRepo(id, { status });
};

export const updatePaymentStatusService = async (id, payment_status) => {
  const order = await findOrderByIdRepo(id);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  return await updateOrderRepo(id, { payment_status });
};

export const markOrderSeenService = async (id) => {
  const order = await findOrderByIdRepo(id);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  return await updateOrderRepo(id, { seen: 1 });
};

export const deleteOrderService = async (id) => {
  const order = await findOrderByIdRepo(id);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  await deleteOrderRepo(id);
  return true;
};
