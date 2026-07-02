import adminUserRoute from "./routes/admin.user.routes.js";

const userManagementModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/user", adminUserRoute);
};

export default userManagementModule;
