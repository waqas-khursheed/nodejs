import wishlistRoute from "./routes/wishlist.routes.js";

const wishlistModule = (app) => {
  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/wishlist", wishlistRoute);
};

export default wishlistModule;
