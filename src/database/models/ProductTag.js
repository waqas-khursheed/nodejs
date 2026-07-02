import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class ProductTag extends Model {
  static associate(models) {
    // ---- hasMany ----
    ProductTag.hasMany(models.AssignTagToProduct, {
      foreignKey: "tag_id",
      as: "assignTagToProducts",
      onDelete: "CASCADE",
    });

    ProductTag.hasMany(models.AssignTagToTag, {
      foreignKey: "tag_id",
      as: "assignTagToTags",
      onDelete: "CASCADE",
    });
  }
}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(99),
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    meta_title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    meta_keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    og_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    icon: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    meta_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    body_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "ProductTag",
    tableName: "product_tags",

    timestamps: false,
  }
);

export default ProductTag;
