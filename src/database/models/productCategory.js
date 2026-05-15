import { DataTypes } from "sequelize";
import { sequelize } from "../../config/db.js";

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },

    slug: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    meta_title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    icon: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    meta_keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    meta_desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    size_chart_mobile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    size_chart: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    is_size_chart: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    parent_id: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    order_by: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "product_categories",
    timestamps: false,
  }
);

export default ProductCategory;