import addressRoute from "./routes/address.routes.js";

const addressModule = (app) => {
  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/address", addressRoute);
};

export default addressModule;
