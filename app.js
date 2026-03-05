import express from "express";
import { sequelize, testConnection } from "./config/db.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use("/api", routes);

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