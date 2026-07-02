import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Faq extends Model {
  static associate(models) {
    // ---- belongsTo ----
    Faq.belongsTo(models.FaqCategory, {
      foreignKey: "category_id",
      as: "category",
    });
  }
}

Faq.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    slug: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "Faq",
    tableName: "faqs",

    timestamps: false,
  }
);

export default Faq;
