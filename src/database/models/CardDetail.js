import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class CardDetail extends Model {
  static associate(models) {
    // ---- hasMany ----
    CardDetail.hasMany(models.MobileCard, {
      foreignKey: "card_id",
      as: "mobileCards",
      onDelete: "CASCADE",
    });

    // ---- belongsTo ----
    CardDetail.belongsTo(models.Country, {
      foreignKey: "country_id",
      as: "country",
    });

    CardDetail.belongsTo(models.CardCategory, {
      foreignKey: "card_category_id",
      as: "cardCategory",
    });

    CardDetail.belongsTo(models.CardType, {
      foreignKey: "card_type_id",
      as: "cardType",
    });

    CardDetail.belongsTo(models.Bank, {
      foreignKey: "bank_id",
      as: "bank",
    });
  }
}

CardDetail.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    card_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    card_category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    card_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    bank_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },

    percentage: {
      type: DataTypes.DOUBLE,
      allowNull: false,
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

    modelName: "CardDetail",
    tableName: "card_details",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default CardDetail;
