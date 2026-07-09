import homeRoute from "./routes/home.routes.js";

const homeModule = (app) => {
  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api", homeRoute);
};

export default homeModule;
