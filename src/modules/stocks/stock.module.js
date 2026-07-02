import adminStockRoute from "./routes/admin.stock.routes.js";

const stockModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/stock", adminStockRoute);
};

export default stockModule;
