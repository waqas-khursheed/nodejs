import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
};

export default config;