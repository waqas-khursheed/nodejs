import adminTagRoute from "./routes/admin.tag.routes.js";
import adminProductTagRoute from "./routes/admin.productTag.routes.js";

const tagModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/tag", adminTagRoute);
  app.use("/api/admin/product-tag", adminProductTagRoute);
};

export default tagModule;
