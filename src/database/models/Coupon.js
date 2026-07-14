import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Coupon extends Model {
  static associate(models) {
    // ---- hasMany ----
    Coupon.hasMany(models.MetaCouponCategory, {
      foreignKey: "coupon_id",
      as: "metaCouponCategories",
      onDelete: "CASCADE",
    });

    Coupon.hasMany(models.MobileCoupon, {
      foreignKey: "coupon_id",
      as: "mobileCoupons",
      onDelete: "SET NULL",
    });

    Coupon.hasMany(models.UsedCoupon, {
      foreignKey: "coupon_id",
      as: "usedCoupons",
      onDelete: "CASCADE",
    });
  }
}

Coupon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    percentage: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    to_all: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    // Max total redemptions across all customers. NULL = unlimited.
    usage_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    used_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    min_order_amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "Coupon",
    tableName: "coupons",

    timestamps: false,
  }
);

export default Coupon;
