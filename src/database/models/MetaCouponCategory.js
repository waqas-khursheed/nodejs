import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class MetaCouponCategory extends Model {
  static associate(models) {
    // ---- belongsTo ----
    MetaCouponCategory.belongsTo(models.ProductCategory, {
      foreignKey: "cat_id",
      as: "cat",
    });

    MetaCouponCategory.belongsTo(models.Coupon, {
      foreignKey: "coupon_id",
      as: "coupon",
    });
  }
}

MetaCouponCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    coupon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "MetaCouponCategory",
    tableName: "meta_coupon_categories",

    timestamps: false,
  }
);

export default MetaCouponCategory;
