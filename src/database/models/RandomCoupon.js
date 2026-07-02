import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class RandomCoupon extends Model {
  static associate(models) {}

}

RandomCoupon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    coupon_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    coupon_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    deduction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    starts_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ends_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    coupon_usage: {
      type: DataTypes.STRING(50),
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

    modelName: "RandomCoupon",
    tableName: "random_coupons",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default RandomCoupon;
