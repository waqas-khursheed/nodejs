import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class RewardSetting extends Model {
  static associate(models) {}

}

RewardSetting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    minimum_points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    equal_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "RewardSetting",
    tableName: "reward_settings",

    timestamps: false,
  }
);

export default RewardSetting;
