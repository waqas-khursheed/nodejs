import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Wishlist extends Model {
  static associate(models) {
    // ---- belongsTo ----
    Wishlist.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });

    Wishlist.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

Wishlist.init(
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

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },

    device_id: {
      type: DataTypes.STRING(100),
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

    modelName: "Wishlist",
    tableName: "wishlists",

    timestamps: false,
  }
);

export default Wishlist;
