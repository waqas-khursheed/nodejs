import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class PasswordReset extends Model {
  static associate(models) {}

}

PasswordReset.init(
  {
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },

    token: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "PasswordReset",
    tableName: "password_resets",

    timestamps: false,
  }
);

PasswordReset.removeAttribute("id");

export default PasswordReset;
