import adminCouponRoute from "./routes/admin.coupon.routes.js";

const couponModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/coupon", adminCouponRoute);
};

export default couponModule;
