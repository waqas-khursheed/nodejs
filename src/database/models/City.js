import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class City extends Model {
  static associate(models) {
    // ---- hasMany ----
    City.hasMany(models.ProductCity, {
      foreignKey: "city_id",
      as: "productCities",
      onDelete: "CASCADE",
    });

    City.hasMany(models.UserAddress, {
      foreignKey: "city_id1",
      as: "userAddressesAsCity1",
      onDelete: "CASCADE",
    });

    City.hasMany(models.UserAddress, {
      foreignKey: "city_id2",
      as: "userAddressesAsCity2",
      onDelete: "SET NULL",
    });

    // ---- belongsTo ----
    City.belongsTo(models.State, {
      foreignKey: "state_id",
      as: "state",
    });
  }
}

City.init(
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

    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "City",
    tableName: "cities",

    timestamps: false,
  }
);

export default City;
