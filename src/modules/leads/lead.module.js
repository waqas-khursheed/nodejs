import adminQueryFormRoute from "./routes/admin.queryForm.routes.js";
import adminSubscribeRoute from "./routes/admin.subscribe.routes.js";
import userLeadRoute from "./routes/user.lead.routes.js";

const leadModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/query-form", adminQueryFormRoute);
  app.use("/api/admin/subscriber", adminSubscribeRoute);

  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api", userLeadRoute);
};

export default leadModule;
