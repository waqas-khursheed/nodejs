import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class ProductCategory extends Model {
  static associate(models) {
    // ---- hasMany ----
    ProductCategory.hasMany(models.AssignCatToProduct, {
      foreignKey: "category_id",
      as: "assignCatToProducts",
      onDelete: "CASCADE",
    });

    ProductCategory.hasMany(models.MetaCouponCategory, {
      foreignKey: "cat_id",
      as: "metaCouponCategories",
      onDelete: "CASCADE",
    });
  }
}

ProductCategory.init(
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
      type: DataTypes.TINYINT,
      defaultValue: 0,
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

    modelName: "ProductCategory",
    tableName: "product_categories",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default ProductCategory;
