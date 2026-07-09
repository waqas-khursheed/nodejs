import adminDashboardRoute from "./routes/admin.dashboard.routes.js";

const dashboardModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/dashboard", adminDashboardRoute);
};

export default dashboardModule;
