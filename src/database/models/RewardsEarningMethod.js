import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class RewardsEarningMethod extends Model {
  static associate(models) {}

}

RewardsEarningMethod.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    purchase: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    equals_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "RewardsEarningMethod",
    tableName: "rewards_earning_method",

    timestamps: false,
  }
);

export default RewardsEarningMethod;
