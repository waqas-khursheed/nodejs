import exchangeRoute from "./routes/exchange.routes.js";

const exchangeModule = (app) => {
  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/exchanges", exchangeRoute);
};

export default exchangeModule;
