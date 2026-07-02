import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class CommonPage extends Model {
  static associate(models) {}

}

CommonPage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    heading: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    page_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "CommonPage",
    tableName: "common_pages",

    timestamps: false,
  }
);

export default CommonPage;
