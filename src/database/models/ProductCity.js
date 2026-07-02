import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class ProductCity extends Model {
  static associate(models) {
    // ---- belongsTo ----
    ProductCity.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });

    ProductCity.belongsTo(models.City, {
      foreignKey: "city_id",
      as: "city",
    });
  }
}

ProductCity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    city_id: {
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

    modelName: "ProductCity",
    tableName: "product_cities",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default ProductCity;
