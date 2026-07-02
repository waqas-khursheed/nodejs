import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Slide extends Model {
  static associate(models) {}

}

Slide.init(
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

    Heading: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    bullet_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    bullet_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    bullet_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    link: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "Slide",
    tableName: "slides",

    timestamps: false,
  }
);

export default Slide;
