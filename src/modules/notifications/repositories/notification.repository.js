import Notification from "../../../database/models/Notification.js";

export const findAllNotificationsRepo = async ({ where, limit, offset }) => {
  return await Notification.findAndCountAll({
    where,
    limit,
    offset,
    order: [["id", "DESC"]],
  });
};

export const findNotificationByIdRepo = async (id) => {
  return await Notification.findByPk(id);
};

export const markNotificationSeenRepo = async (id) => {
  await Notification.update({ seen: 1 }, { where: { id } });
  return await findNotificationByIdRepo(id);
};

export const markAllNotificationsSeenRepo = async () => {
  await Notification.update({ seen: 1 }, { where: { seen: 0 } });
};

export const deleteNotificationRepo = async (id) => {
  return await Notification.destroy({ where: { id } });
};
