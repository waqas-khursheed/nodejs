import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class MobileCoupon extends Model {
  static associate(models) {
    // ---- belongsTo ----
    MobileCoupon.belongsTo(models.Coupon, {
      foreignKey: "coupon_id",
      as: "coupon",
    });
  }
}

MobileCoupon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    coupon_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    device_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    coupon_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    coupon_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    deduction: {
      type: DataTypes.DOUBLE(14,2),
      allowNull: true,
    },

    status: {
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

    modelName: "MobileCoupon",
    tableName: "mobile_coupons",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default MobileCoupon;
