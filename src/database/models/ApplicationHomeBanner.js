import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class ApplicationHomeBanner extends Model {
  static associate(models) {}

}

ApplicationHomeBanner.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "ApplicationHomeBanner",
    tableName: "application_home_banners",

    timestamps: false,
  }
);

export default ApplicationHomeBanner;
