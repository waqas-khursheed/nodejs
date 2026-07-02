import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class AssignCatToProduct extends Model {
  static associate(models) {
    // ---- belongsTo ----
    AssignCatToProduct.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });

    AssignCatToProduct.belongsTo(models.ProductCategory, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

AssignCatToProduct.init(
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

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "AssignCatToProduct",
    tableName: "assign_cat_to_products",

    timestamps: false,
  }
);

export default AssignCatToProduct;
