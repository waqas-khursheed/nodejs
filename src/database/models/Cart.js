import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Cart extends Model {
  static associate(models) {
    // ---- belongsTo ----
    Cart.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });

    Cart.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    size_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    fitting_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },

    device_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    user_ip: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    composite_attribute_key: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    is_coupon: {
      type: DataTypes.STRING,
      defaultValue: "0",
    },

    is_card: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    coupon_discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,

    modelName: "Cart",
    tableName: "carts",

    timestamps: false,
  }
);

export default Cart;
