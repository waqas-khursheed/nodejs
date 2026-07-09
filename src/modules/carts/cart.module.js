import cartRoute from "./routes/cart.routes.js";

const cartModule = (app) => {
  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/cart", cartRoute);
};

export default cartModule;
