import adminFaqCategoryRoute from "./routes/admin.faqCategory.routes.js";
import adminFaqRoute from "./routes/admin.faq.routes.js";
import adminCommonPageRoute from "./routes/admin.commonPage.routes.js";
import adminContactUsPageRoute from "./routes/admin.contactUsPage.routes.js";

const cmsModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/faq-category", adminFaqCategoryRoute);
  app.use("/api/admin/faq", adminFaqRoute);
  app.use("/api/admin/page", adminCommonPageRoute);
  app.use("/api/admin/contact-us-page", adminContactUsPageRoute);
};

export default cmsModule;
