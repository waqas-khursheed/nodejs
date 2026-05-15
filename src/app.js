import express from "express";
import { sequelize, testConnection } from "./config/db.js";
import authModule from "./modules/auth/auth.module.js";
import categoryModule from "./modules/categories/category.module.js";
import { notFound } from "./shared/middleware/notFound.js";
import { errorHandler } from "./shared/middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// modules
authModule(app);
categoryModule(app);

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