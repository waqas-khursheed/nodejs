import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class MobileCard extends Model {
  static associate(models) {
    // ---- belongsTo ----
    MobileCard.belongsTo(models.CardDetail, {
      foreignKey: "card_id",
      as: "card",
    });
  }
}

MobileCard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    card_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    card_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    percentage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    device_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,

    modelName: "MobileCard",
    tableName: "mobile_card",

    timestamps: false,
  }
);

export default MobileCard;
