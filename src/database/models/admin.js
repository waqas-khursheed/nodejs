import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";
const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    is_admin: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "admins",
    timestamps: false,
  }
);

export default Admin;