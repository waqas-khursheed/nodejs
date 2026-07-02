import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class CardType extends Model {
  static associate(models) {
    // ---- hasMany ----
    CardType.hasMany(models.CardDetail, {
      foreignKey: "card_type_id",
      as: "cardDetails",
      onDelete: "CASCADE",
    });
  }
}

CardType.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    card_type: {
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

    modelName: "CardType",
    tableName: "card_types",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default CardType;
