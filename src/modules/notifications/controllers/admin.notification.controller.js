import Notification from "../../../database/models/Notification.js";
import { getPagination, buildPaginationMeta } from "../../../shared/utils/pagination.js";
import { successResponse, successDataResponse, errorResponse } from "../../../shared/responses/apiResponse.js";

export const listNotifications = async (req, res) => {
  try {
    const { page, limit, offset } = getPagination(req.query);
    const where = {};
    if (req.query.seen !== undefined && req.query.seen !== "") where.seen = req.query.seen;
    if (req.query.table_name) where.table_name = req.query.table_name;

    const { count, rows } = await Notification.findAndCountAll({
      where,
      limit,
      offset,
      order: [["id", "DESC"]],
    });

    return successDataResponse(
      res,
      "Notifications fetched successfully",
      { notifications: rows, meta: buildPaginationMeta({ count, page, limit }) },
      200
    );
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const getNotification = async (req, res) => {
  try {
    const row = await Notification.findByPk(req.params.id);
    if (!row) return errorResponse(res, "Notification not found", 404);

    return successDataResponse(res, "Notification fetched successfully", row, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const markNotificationSeen = async (req, res) => {
  try {
    const row = await Notification.findByPk(req.params.id);
    if (!row) return errorResponse(res, "Notification not found", 404);

    await Notification.update({ seen: 1 }, { where: { id: req.params.id } });
    const updated = await Notification.findByPk(req.params.id);

    return successDataResponse(res, "Notification marked as seen", updated, 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const markAllNotificationsSeen = async (req, res) => {
  try {
    await Notification.update({ seen: 1 }, { where: { seen: 0 } });
    return successResponse(res, "All notifications marked as seen", 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const row = await Notification.findByPk(req.params.id);
    if (!row) return errorResponse(res, "Notification not found", 404);

    await Notification.destroy({ where: { id: req.params.id } });
    return successResponse(res, "Notification deleted successfully", 200);
  } catch (error) {
    return errorResponse(
      res,
      process.env.NODE_ENV === "development" ? error.message : "Internal Server Error",
      500
    );
  }
};
