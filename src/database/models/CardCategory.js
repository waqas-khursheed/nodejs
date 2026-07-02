import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class CardCategory extends Model {
  static associate(models) {
    // ---- hasMany ----
    CardCategory.hasMany(models.CardDetail, {
      foreignKey: "card_category_id",
      as: "cardDetails",
      onDelete: "CASCADE",
    });
  }
}

CardCategory.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    card_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.TINYINT,
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

    modelName: "CardCategory",
    tableName: "card_categories",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default CardCategory;
