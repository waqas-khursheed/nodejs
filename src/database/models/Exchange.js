import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Exchange extends Model {
  static associate(models) {
    Exchange.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
  }

}

Exchange.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    order_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    return_item_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    return_item_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    return_item_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    other_detail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    required_item_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    required_item_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    required_item_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    seen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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

    modelName: "Exchange",
    tableName: "exchanges",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Exchange;
