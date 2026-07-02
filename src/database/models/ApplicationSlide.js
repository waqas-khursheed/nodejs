import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class ApplicationSlide extends Model {
  static associate(models) {}

}

ApplicationSlide.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "ApplicationSlide",
    tableName: "application_slides",

    timestamps: false,
  }
);

export default ApplicationSlide;
