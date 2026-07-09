import adminCouponRoute from "./routes/admin.coupon.routes.js";
import userCouponRoute from "./routes/user.coupon.routes.js";

const couponModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/coupon", adminCouponRoute);

  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/coupon", userCouponRoute);
};

export default couponModule;
