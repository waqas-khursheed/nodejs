import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class AttributeItem extends Model {
  static associate(models) {
    // ---- hasMany ----
    AttributeItem.hasMany(models.AssignAttrToProduct, {
      foreignKey: "attribute_id",
      as: "assignAttrToProducts",
      onDelete: "CASCADE",
    });

    // ---- belongsTo ----
    AttributeItem.belongsTo(models.ProductAttribute, {
      foreignKey: "attribute_id",
      as: "attribute",
    });
  }
}

AttributeItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    order_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "AttributeItem",
    tableName: "attribute_items",

    timestamps: false,
  }
);

export default AttributeItem;
