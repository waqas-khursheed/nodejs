// models/index.js
import { Sequelize, DataTypes } from "sequelize";
import config from "../config/config.js"; // default export
import UserModel from "./user.js"; // default import

// Sequelize instance
const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,
  }
);

// Initialize models
const User = UserModel(sequelize, DataTypes);

// Add relations here if needed
// e.g., User.hasMany(Post);

// Export sequelize and models
export { sequelize, User };