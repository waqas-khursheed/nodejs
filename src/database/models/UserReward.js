import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class UserReward extends Model {
  static associate(models) {
    // ---- belongsTo ----
    UserReward.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

UserReward.init(
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

    rewards: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "UserReward",
    tableName: "user_rewards",

    timestamps: false,
  }
);

export default UserReward;
