import adminWebSettingRoute from "./routes/admin.webSetting.routes.js";
import userWebSettingRoute from "./routes/user.webSetting.routes.js";

const settingModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/web-setting", adminWebSettingRoute);

  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/settings", userWebSettingRoute);
};

export default settingModule;
