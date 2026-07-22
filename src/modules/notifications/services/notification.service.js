import {
  findAllNotificationsRepo,
  findNotificationByIdRepo,
  markNotificationSeenRepo,
  markAllNotificationsSeenRepo,
  deleteNotificationRepo,
} from "../repositories/notification.repository.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";

export const getNotificationsService = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.seen !== undefined && query.seen !== "") where.seen = query.seen;
  if (query.table_name) where.table_name = query.table_name;

  const { count, rows } = await findAllNotificationsRepo({ where, limit, offset });

  return { notifications: rows, meta: buildPaginationMeta({ count, page, limit }) };
};

export const getNotificationByIdService = async (id) => {
  const notification = await findNotificationByIdRepo(id);
  if (!notification) throw new Error("NOTIFICATION_NOT_FOUND");
  return notification;
};

export const markNotificationSeenService = async (id) => {
  const notification = await findNotificationByIdRepo(id);
  if (!notification) throw new Error("NOTIFICATION_NOT_FOUND");

  return await markNotificationSeenRepo(id);
};

export const markAllNotificationsSeenService = async () => {
  await markAllNotificationsSeenRepo();
};

export const deleteNotificationService = async (id) => {
  const notification = await findNotificationByIdRepo(id);
  if (!notification) throw new Error("NOTIFICATION_NOT_FOUND");

  await deleteNotificationRepo(id);
};
