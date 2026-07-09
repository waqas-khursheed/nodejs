import adminOrderRoute from "./routes/admin.order.routes.js";
import checkoutRoute from "./routes/checkout.routes.js";

const orderModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/order", adminOrderRoute);

  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api", checkoutRoute);
};

export default orderModule;
