import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

// Audit trail for Order.status / Order.payment_status changes — orders
// previously had no record of a status change's previous value, timestamp,
// or which admin made it.
class OrderStatusHistory extends Model {
  static associate(models) {
    OrderStatusHistory.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });

    OrderStatusHistory.belongsTo(models.Admin, {
      foreignKey: "changed_by_admin_id",
      as: "changedByAdmin",
    });
  }
}

OrderStatusHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    field: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    from_value: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    to_value: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    changed_by_admin_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,

    modelName: "OrderStatusHistory",
    tableName: "order_status_histories",

    timestamps: false,
  }
);

export default OrderStatusHistory;
