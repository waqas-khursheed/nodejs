import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class SideBanner extends Model {
  static associate(models) {}

}

SideBanner.init(
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

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "SideBanner",
    tableName: "side_banners",

    timestamps: false,
  }
);

export default SideBanner;
