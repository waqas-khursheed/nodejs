import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class State extends Model {
  static associate(models) {
    // ---- hasMany ----
    State.hasMany(models.City, {
      foreignKey: "state_id",
      as: "cities",
      onDelete: "CASCADE",
    });

    State.hasMany(models.UserAddress, {
      foreignKey: "state_id1",
      as: "userAddressesAsState1",
      onDelete: "CASCADE",
    });

    State.hasMany(models.UserAddress, {
      foreignKey: "state_id2",
      as: "userAddressesAsState2",
      onDelete: "SET NULL",
    });

    // ---- belongsTo ----
    State.belongsTo(models.Country, {
      foreignKey: "country_id",
      as: "country",
    });
  }
}

State.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },

    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,

    modelName: "State",
    tableName: "states",

    timestamps: false,
  }
);

export default State;
