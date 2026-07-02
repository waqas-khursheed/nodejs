import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Country extends Model {
  static associate(models) {
    // ---- hasMany ----
    Country.hasMany(models.State, {
      foreignKey: "country_id",
      as: "states",
      onDelete: "CASCADE",
    });

    Country.hasMany(models.CardDetail, {
      foreignKey: "country_id",
      as: "cardDetails",
      onDelete: "CASCADE",
    });

    Country.hasMany(models.UserAddress, {
      foreignKey: "country_id1",
      as: "userAddressesAsCountry1",
      onDelete: "CASCADE",
    });

    Country.hasMany(models.UserAddress, {
      foreignKey: "country_id2",
      as: "userAddressesAsCountry2",
      onDelete: "SET NULL",
    });
  }
}

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    country_code: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: "",
    },

    country_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,

    modelName: "Country",
    tableName: "countries",

    timestamps: false,
  }
);

export default Country;
