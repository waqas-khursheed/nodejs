import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class ProductAttribute extends Model {
  static associate(models) {
    // ---- hasMany ----
    ProductAttribute.hasMany(models.AttributeItem, {
      foreignKey: "attribute_id",
      as: "attributeItems",
      onDelete: "CASCADE",
    });
  }
}

ProductAttribute.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    attribute_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "ProductAttribute",
    tableName: "product_attributes",

    timestamps: false,
  }
);

export default ProductAttribute;
