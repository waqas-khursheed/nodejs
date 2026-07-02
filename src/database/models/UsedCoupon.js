import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class UsedCoupon extends Model {
  static associate(models) {
    // ---- belongsTo ----
    UsedCoupon.belongsTo(models.Coupon, {
      foreignKey: "coupon_id",
      as: "coupon",
    });

    UsedCoupon.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

UsedCoupon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    coupon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
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

    modelName: "UsedCoupon",
    tableName: "used_coupons",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default UsedCoupon;
