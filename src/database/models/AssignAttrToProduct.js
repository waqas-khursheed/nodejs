import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class AssignAttrToProduct extends Model {
  static associate(models) {
    // ---- belongsTo ----
    AssignAttrToProduct.belongsTo(models.AttributeItem, {
      foreignKey: "attribute_id",
      as: "attribute",
    });

    AssignAttrToProduct.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

AssignAttrToProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    in_stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    with_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,

    modelName: "AssignAttrToProduct",
    tableName: "assign_attr_to_products",

    timestamps: false,
  }
);

export default AssignAttrToProduct;
