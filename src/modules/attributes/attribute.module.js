import adminAttributeRoute from "./routes/admin.attribute.routes.js";
import adminAttributeItemRoute from "./routes/admin.attributeItem.routes.js";

const attributeModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/attribute-item", adminAttributeItemRoute);
  app.use("/api/admin/attribute", adminAttributeRoute);
};

export default attributeModule;
