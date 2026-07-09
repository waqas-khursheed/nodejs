import adminWebSettingRoute from "./routes/admin.webSetting.routes.js";

const settingModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/web-setting", adminWebSettingRoute);
};

export default settingModule;
