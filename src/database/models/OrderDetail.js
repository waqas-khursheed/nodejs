import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class OrderDetail extends Model {
  static associate(models) {
    // ---- belongsTo ----
    OrderDetail.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });

    OrderDetail.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

OrderDetail.init(
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

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    color_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    size_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fitting_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    dis_price: {
      type: DataTypes.DOUBLE(11,2),
      allowNull: false,
    },

    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    composite_attribute_key: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    date: {
      type: DataTypes.STRING,
      allowNull: true,
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

    modelName: "OrderDetail",
    tableName: "order_details",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default OrderDetail;
