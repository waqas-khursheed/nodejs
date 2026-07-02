import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Brand extends Model {
  static associate(models) {
    // ---- hasMany ----
    Brand.hasMany(models.Product, {
      foreignKey: "brand_id",
      as: "products",
      onDelete: "SET NULL",
    });
  }
}

Brand.init(
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

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    logo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    banner: {
      type: DataTypes.TEXT,
      allowNull: false,
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

    modelName: "Brand",
    tableName: "brands",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Brand;
