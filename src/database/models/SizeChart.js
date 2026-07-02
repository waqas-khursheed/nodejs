import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class SizeChart extends Model {
  static associate(models) {}

}

SizeChart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    chart_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    chart_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    chart_slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "SizeChart",
    tableName: "size_charts",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default SizeChart;
