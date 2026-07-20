import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db.js";

// A "notify me when back in stock" subscription. `stock_id` is null for a
// non-variant product (the alert just watches the product's own quantity);
// otherwise it's scoped to one specific variant, since a restock of Size M
// shouldn't email someone waiting on Size L.
class StockAlert extends Model {
  static associate(models) {
    StockAlert.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
    StockAlert.belongsTo(models.Stock, { foreignKey: "stock_id", as: "stock" });
  }
}

StockAlert.init(
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

    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    notified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,

    modelName: "StockAlert",
    tableName: "stock_alerts",

    timestamps: false,
  }
);

export default StockAlert;
