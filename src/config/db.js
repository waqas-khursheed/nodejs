import { Sequelize } from "sequelize";
import config from "./config.js";
import { logger } from "../shared/utils/logger.js";

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    dialect: config.db.dialect
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database", { error: error.message });
    process.exit(1);
  }
};

export { sequelize, testConnection }; // named exports