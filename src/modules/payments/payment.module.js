import adminBankRoute from "./routes/admin.bank.routes.js";
import adminCardCategoryRoute from "./routes/admin.cardCategory.routes.js";
import adminCardTypeRoute from "./routes/admin.cardType.routes.js";
import adminCardDetailRoute from "./routes/admin.cardDetail.routes.js";
import adminMobileCardRoute from "./routes/admin.mobileCard.routes.js";
import userCardDetailRoute from "./routes/user.cardDetail.routes.js";

const paymentModule = (app) => {
  // =========================
  //  ADMIN ROUTES
  // =========================
  app.use("/api/admin/bank", adminBankRoute);
  app.use("/api/admin/card-category", adminCardCategoryRoute);
  app.use("/api/admin/card-type", adminCardTypeRoute);
  app.use("/api/admin/card-detail", adminCardDetailRoute);
  app.use("/api/admin/mobile-card", adminMobileCardRoute);

  // =========================
  //  USER ROUTES
  // =========================
  app.use("/api/card-detail", userCardDetailRoute);
};

export default paymentModule;
