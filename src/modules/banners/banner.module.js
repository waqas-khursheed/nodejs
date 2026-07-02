import adminSlideRoute from "./routes/admin.slide.routes.js";
import adminHomeBannerRoute from "./routes/admin.homeBanner.routes.js";
import adminApplicationHomeBannerRoute from "./routes/admin.applicationHomeBanner.routes.js";
import adminSideBannerRoute from "./routes/admin.sideBanner.routes.js";
import adminApplicationSlideRoute from "./routes/admin.applicationSlide.routes.js";
import adminMobileSliderRoute from "./routes/admin.mobileSlider.routes.js";

const bannerModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/slide", adminSlideRoute);
  app.use("/api/admin/home-banner", adminHomeBannerRoute);
  app.use("/api/admin/application-home-banner", adminApplicationHomeBannerRoute);
  app.use("/api/admin/side-banner", adminSideBannerRoute);
  app.use("/api/admin/application-slide", adminApplicationSlideRoute);
  app.use("/api/admin/mobile-slider", adminMobileSliderRoute);
};

export default bannerModule;
