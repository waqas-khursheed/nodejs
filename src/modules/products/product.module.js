import adminProductRoute from "./routes/admin.product.routes.js";

const productModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/product", adminProductRoute);
};

export default productModule;
