import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Order extends Model {
  static associate(models) {
    // ---- hasMany ----
    Order.hasMany(models.OrderDetail, {
      foreignKey: "order_id",
      as: "orderDetails",
      onDelete: "CASCADE",
    });

    Order.hasMany(models.OrderGallery, {
      foreignKey: "order_id",
      as: "orderGalleries",
      onDelete: "CASCADE",
    });

    Order.hasMany(models.BillingDetail, {
      foreignKey: "order_id",
      as: "billingDetails",
      onDelete: "CASCADE",
    });

    // ---- belongsTo ----
    Order.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    order_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },

    user_ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },

    pay_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    shipping: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    sub_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    coupon_discount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },

    coupon_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    card_discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    card_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    rewards_discount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    grand_total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    delivery_day: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    delivery_start_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },

    delivery_end_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },

    payment_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "pending",
    },

    order_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    is_deduction: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    seen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,

    modelName: "Order",
    tableName: "orders",

    timestamps: false,
  }
);

export default Order;
