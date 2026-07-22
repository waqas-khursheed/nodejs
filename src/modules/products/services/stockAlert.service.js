import { Op } from "sequelize";
import {
  findAllStockAlertsRepo,
  findStockAlertByIdRepo,
  deleteStockAlertRepo,
} from "../repositories/stockAlert.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const getStockAlertsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.notified === "1") where.notified_at = { [Op.ne]: null };
  if (query.notified === "0") where.notified_at = null;
  if (query.search) where.email = { [Op.like]: `%${query.search}%` };

  const { count, rows } = await findAllStockAlertsRepo({ where, limit, offset });

  return { stockAlerts: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const deleteStockAlertService = async (id) => {
  const alert = await findStockAlertByIdRepo(id);
  if (!alert) throw new Error("STOCK_ALERT_NOT_FOUND");

  await deleteStockAlertRepo(id);
};
