import adminProductRoute from "./routes/admin.product.routes.js";
import userProductRoute from "./routes/user.product.routes.js";

const productModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/product", adminProductRoute);

  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/products", userProductRoute);
};

export default productModule;
