import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Bank extends Model {
  static associate(models) {
    // ---- hasMany ----
    Bank.hasMany(models.CardDetail, {
      foreignKey: "bank_id",
      as: "cardDetails",
      onDelete: "CASCADE",
    });
  }
}

Bank.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    bank_title: {
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

    modelName: "Bank",
    tableName: "banks",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Bank;
