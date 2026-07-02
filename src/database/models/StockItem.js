import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class StockItem extends Model {
  static associate(models) {
    // ---- belongsTo ----
    StockItem.belongsTo(models.Stock, {
      foreignKey: "stock_id",
      as: "stock",
    });

    StockItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

StockItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    composite_stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "StockItem",
    tableName: "stock_items",

    timestamps: false,
  }
);

export default StockItem;
