import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class FaqCategory extends Model {
  static associate(models) {
    // ---- hasMany ----
    FaqCategory.hasMany(models.Faq, {
      foreignKey: "category_id",
      as: "faqs",
      onDelete: "CASCADE",
    });
  }
}

FaqCategory.init(
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
  },
  {
    sequelize,

    modelName: "FaqCategory",
    tableName: "faq_categories",

    timestamps: false,
  }
);

export default FaqCategory;
