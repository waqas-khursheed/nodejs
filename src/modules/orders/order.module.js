import adminOrderRoute from "./routes/admin.order.routes.js";

const orderModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/order", adminOrderRoute);
};

export default orderModule;
