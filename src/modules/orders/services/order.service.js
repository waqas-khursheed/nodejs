import { Op } from "sequelize";
import { sequelize } from "../../../config/db.js";
import {
  findOrderByIdRepo,
  findAllOrdersRepo,
  updateOrderRepo,
  updateOrderFieldsRepo,
  createOrderStatusHistoryRepo,
  deleteOrderRepo,
} from "../repositories/order.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";
import { restoreStockForOrderDetails } from "./orderStock.helper.js";
import { bulkDelete } from "../../../shared/utils/bulkDelete.js";

// Statuses that mean "this order's items are back in inventory" — see
// frontend_admin/src/types/order.ts ORDER_STATUS_LABELS for the full map.
const CANCELLED_STATUS = 5;
const RETURNED_STATUS = 6;
const STOCK_RESTORING_STATUSES = [CANCELLED_STATUS, RETURNED_STATUS];

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

// Records the change in order_status_histories in the same transaction as
// the update, so the two can never drift apart (e.g. status changed but no
// history row, or vice versa).
const updateFieldWithHistory = async (id, field, newValue, adminId) => {
  const order = await findOrderByIdRepo(id);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  const fromValue = order[field];

  await sequelize.transaction(async (transaction) => {
    await updateOrderFieldsRepo(id, { [field]: newValue }, { transaction });
    await createOrderStatusHistoryRepo(
      { orderId: id, field, fromValue, toValue: newValue, changedByAdminId: adminId },
      { transaction }
    );
  });

  return await findOrderByIdRepo(id, true);
};

export const updateOrderStatusService = async (id, status, adminId) => {
  const newStatus = Number(status);
  const restoresStock = STOCK_RESTORING_STATUSES.includes(newStatus);

  // Only need the order-detail lines loaded when we're actually about to
  // restore stock — every other status change stays on the cheap lookup.
  const order = await findOrderByIdRepo(id, restoresStock);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  const fromValue = order.status;
  const alreadyRestored = STOCK_RESTORING_STATUSES.includes(fromValue);

  await sequelize.transaction(async (transaction) => {
    if (restoresStock && !alreadyRestored) {
      await restoreStockForOrderDetails(order.orderDetails, transaction);
    }

    await updateOrderFieldsRepo(id, { status: newStatus }, { transaction });
    await createOrderStatusHistoryRepo(
      { orderId: id, field: "status", fromValue, toValue: newStatus, changedByAdminId: adminId },
      { transaction }
    );
  });

  return await findOrderByIdRepo(id, true);
};

export const updatePaymentStatusService = async (id, payment_status, adminId) => {
  return await updateFieldWithHistory(id, "payment_status", payment_status, adminId);
};

export const markOrderSeenService = async (id) => {
  const order = await findOrderByIdRepo(id);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  return await updateOrderRepo(id, { seen: 1 });
};

export const deleteOrderService = async (id) => {
  const order = await findOrderByIdRepo(id);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  // Order is `paranoid: true` (see database/models/Order.js), so this sets
  // `deleted_at` instead of actually removing the row — order history,
  // billing details, and line items are preserved for reporting/disputes.
  await deleteOrderRepo(id);
  return true;
};

export const bulkDeleteOrdersService = async (ids) => {
  return await bulkDelete(ids, deleteOrderService);
};
