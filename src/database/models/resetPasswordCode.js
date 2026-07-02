import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class ResetPasswordCode extends Model {
  static associate(models) {
    // ---- belongsTo ----
    ResetPasswordCode.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

ResetPasswordCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    code: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },

    is_active: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,

    modelName: "ResetPasswordCode",
    tableName: "reset_password_codes",

    timestamps: false,
  }
);

export default ResetPasswordCode;
