import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class AssignTagToProduct extends Model {
  static associate(models) {
    // ---- belongsTo ----
    AssignTagToProduct.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });

    AssignTagToProduct.belongsTo(models.ProductTag, {
      foreignKey: "tag_id",
      as: "tag",
    });
  }
}

AssignTagToProduct.init(
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

    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "AssignTagToProduct",
    tableName: "assign_tag_to_products",

    timestamps: false,
  }
);

export default AssignTagToProduct;
