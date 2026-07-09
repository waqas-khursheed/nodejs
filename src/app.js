import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { sequelize, testConnection } from "./config/db.js";
import "./database/models/index.js"; // registers all model associations
import swaggerSpec from "./config/swagger.js";
import { apiLimiter } from "./shared/middleware/rateLimiter.js";
import authModule from "./modules/auth/auth.module.js";
import categoryModule from "./modules/categories/category.module.js";
import brandModule from "./modules/brands/brand.module.js";
import attributeModule from "./modules/attributes/attribute.module.js";
import productModule from "./modules/products/product.module.js";
import stockModule from "./modules/stocks/stock.module.js";
import bannerModule from "./modules/banners/banner.module.js";
import couponModule from "./modules/coupons/coupon.module.js";
import orderModule from "./modules/orders/order.module.js";
import userManagementModule from "./modules/users/user.module.js";
import reviewModule from "./modules/reviews/review.module.js";
import rewardModule from "./modules/rewards/reward.module.js";
import cmsModule from "./modules/cms/cms.module.js";
import settingModule from "./modules/settings/setting.module.js";
import locationModule from "./modules/locations/location.module.js";
import paymentModule from "./modules/payments/payment.module.js";
import notificationModule from "./modules/notifications/notification.module.js";
import leadModule from "./modules/leads/lead.module.js";
import dashboardModule from "./modules/dashboard/dashboard.module.js";
import wishlistModule from "./modules/wishlists/wishlist.module.js";
import cartModule from "./modules/carts/cart.module.js";
import addressModule from "./modules/addresses/address.module.js";
import exchangeModule from "./modules/exchanges/exchange.module.js";
import homeModule from "./modules/home/home.module.js";
import { notFound } from "./shared/middleware/notFound.js";
import { errorHandler } from "./shared/middleware/errorHandler.js";

const app = express();

// =====================================
// SECURITY MIDDLEWARE
// =====================================
app.use(helmet());
app.use(cors());
app.use(apiLimiter);

app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true, limit: "200kb" }));

// =====================================
// API DOCS
// =====================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));

// =====================================
// STATIC UPLOADS
// =====================================
app.use("/uploads", express.static("src/storage/uploads"));

// modules
authModule(app);
categoryModule(app);
brandModule(app);
attributeModule(app);
productModule(app);
stockModule(app);
bannerModule(app);
couponModule(app);
orderModule(app);
userManagementModule(app);
reviewModule(app);
rewardModule(app);
cmsModule(app);
settingModule(app);
locationModule(app);
paymentModule(app);
notificationModule(app);
leadModule(app);
dashboardModule(app);
wishlistModule(app);
cartModule(app);
addressModule(app);
exchangeModule(app);
homeModule(app);

// 404 handler
app.use(notFound);

// global error handler
app.use(errorHandler);

const initializeApp = async () => {
  try {
    await testConnection();
    console.log("Application initialized successfully");
  } catch (error) {
    console.error("Failed to initialize application:", error);
    process.exit(1);
  }
};

export { app, initializeApp };
