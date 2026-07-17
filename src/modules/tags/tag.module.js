import adminTagRoute from "./routes/admin.tag.routes.js";
import adminProductTagRoute from "./routes/admin.productTag.routes.js";
import userTagRoute from "./routes/user.tag.routes.js";

const tagModule = (app) => {
  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/tags", userTagRoute);

  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/tag", adminTagRoute);
  app.use("/api/admin/product-tag", adminProductTagRoute);
};

export default tagModule;
