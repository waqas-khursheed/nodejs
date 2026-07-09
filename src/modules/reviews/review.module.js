import adminReviewRoute from "./routes/admin.review.routes.js";
import userReviewRoute from "./routes/user.review.routes.js";

const reviewModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/review", adminReviewRoute);

  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/reviews", userReviewRoute);
};

export default reviewModule;
