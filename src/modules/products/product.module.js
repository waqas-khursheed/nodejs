import adminProductRoute from "./routes/admin.product.routes.js";
import adminStockAlertRoute from "./routes/admin.stockAlert.routes.js";
import userProductRoute from "./routes/user.product.routes.js";

const productModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/product", adminProductRoute);
  app.use("/api/admin/stock-alerts", adminStockAlertRoute);

  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/products", userProductRoute);
};

export default productModule;
