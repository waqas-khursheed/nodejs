import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Admin extends Model {
  static associate(models) {}

}

Admin.init(
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
      unique: true,
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

    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,

    modelName: "Admin",
    tableName: "admins",

    timestamps: false,
  }
);

export default Admin;
