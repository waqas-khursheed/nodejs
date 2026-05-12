
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db.js";

class ResetPasswordCode extends Model {}

ResetPasswordCode.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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