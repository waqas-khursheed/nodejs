import {
  getNotificationsService,
  getNotificationByIdService,
  markNotificationSeenService,
  markAllNotificationsSeenService,
  deleteNotificationService,
} from "../services/notification.service.js";
import { successResponse, successDataResponse } from "../../../shared/responses/apiResponse.js";
import { createErrorHandler } from "../../../shared/utils/controllerErrorHandler.js";

const errorMap = {
  NOTIFICATION_NOT_FOUND: { code: 404, msg: "Notification not found" },
};

const handleServiceError = createErrorHandler(errorMap);

export const listNotifications = async (req, res) => {
  try {
    const result = await getNotificationsService(req.query);

    return successDataResponse(res, "Notifications fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const getNotification = async (req, res) => {
  try {
    const result = await getNotificationByIdService(req.params.id);

    return successDataResponse(res, "Notification fetched successfully", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const markNotificationSeen = async (req, res) => {
  try {
    const result = await markNotificationSeenService(req.params.id);

    return successDataResponse(res, "Notification marked as seen", result, 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const markAllNotificationsSeen = async (req, res) => {
  try {
    await markAllNotificationsSeenService();

    return successResponse(res, "All notifications marked as seen", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};

export const deleteNotification = async (req, res) => {
  try {
    await deleteNotificationService(req.params.id);

    return successResponse(res, "Notification deleted successfully", 200);
  } catch (error) {
    return handleServiceError(res, error);
  }
};
