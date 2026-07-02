import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Stock extends Model {
  static associate(models) {
    // ---- hasMany ----
    Stock.hasMany(models.StockItem, {
      foreignKey: "stock_id",
      as: "stockItems",
      onDelete: "SET NULL",
    });

    // ---- belongsTo ----
    Stock.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

Stock.init(
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

    stock_qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    stock_dis_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    stock_dis_percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    stock_dis_from_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    stock_dis_to_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    stock_dis_from_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },

    stock_dis_to_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },

    stock_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    color_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    size_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    fitting_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    // No defaultValue here: "... ON UPDATE CURRENT_TIMESTAMP" is only valid
    // in a column DEFINITION (see the migration), not as an INSERT/UPDATE
    // value expression. The DB column default handles this automatically.
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "Stock",
    tableName: "stocks",

    timestamps: false,
  }
);

export default Stock;
