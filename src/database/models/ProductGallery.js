import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class ProductGallery extends Model {
  static associate(models) {
    // ---- belongsTo ----
    ProductGallery.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
  }
}

ProductGallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "ProductGallery",
    tableName: "product_galleries",

    timestamps: false,
  }
);

export default ProductGallery;
