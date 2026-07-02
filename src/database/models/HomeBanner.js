import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class HomeBanner extends Model {
  static associate(models) {}

}

HomeBanner.init(
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

    modelName: "HomeBanner",
    tableName: "home_banners",

    timestamps: false,
  }
);

export default HomeBanner;
