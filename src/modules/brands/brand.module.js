import adminBrandRoute from "./routes/admin.brand.routes.js";

const brandModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/brand", adminBrandRoute);
};

export default brandModule;
