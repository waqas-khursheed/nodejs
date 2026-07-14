import exchangeRoute from "./routes/exchange.routes.js";
import adminExchangeRoute from "./routes/admin.exchange.routes.js";

const exchangeModule = (app) => {
  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/exchanges", exchangeRoute);

  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/exchange", adminExchangeRoute);
};

export default exchangeModule;
