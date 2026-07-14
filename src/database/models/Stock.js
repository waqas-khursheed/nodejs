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

    // color_id/size_id/fitting_id all point at the same `attribute_items`
    // table (there's no separate Color/Size/Fitting model — those are just
    // AttributeItem rows grouped under different ProductAttribute types),
    // so three separate aliased associations to the same target model.
    Stock.belongsTo(models.AttributeItem, {
      foreignKey: "color_id",
      as: "color",
    });

    Stock.belongsTo(models.AttributeItem, {
      foreignKey: "size_id",
      as: "size",
    });

    Stock.belongsTo(models.AttributeItem, {
      foreignKey: "fitting_id",
      as: "fitting",
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

  },
  {
    sequelize,

    modelName: "Stock",
    tableName: "stocks",

    // `created_at` is still DB-managed (see the migration's CURRENT_TIMESTAMP
    // default) rather than Sequelize-managed, so only updatedAt is mapped
    // here — this is what lets Sequelize see `stock_qty` writes update
    // `updated_at` (it was previously an untracked plain column).
    timestamps: true,
    createdAt: false,
    updatedAt: "updated_at",
  }
);

export default Stock;
