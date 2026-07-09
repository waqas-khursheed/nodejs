import adminNotificationRoute from "./routes/admin.notification.routes.js";

const notificationModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/notification", adminNotificationRoute);
};

export default notificationModule;
