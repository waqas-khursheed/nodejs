import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class OrderGallery extends Model {
  static associate(models) {
    // ---- belongsTo ----
    OrderGallery.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
  }
}

OrderGallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "OrderGallery",
    tableName: "order_galleries",

    timestamps: false,
  }
);

export default OrderGallery;
