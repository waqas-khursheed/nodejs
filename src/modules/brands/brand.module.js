import adminBrandRoute from "./routes/admin.brand.routes.js";
import userBrandRoute from "./routes/user.brand.routes.js";

const brandModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/brand", adminBrandRoute);

  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/brands", userBrandRoute);
};

export default brandModule;
