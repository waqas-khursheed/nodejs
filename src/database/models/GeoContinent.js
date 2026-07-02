import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class GeoContinent extends Model {
  static associate(models) {
    // ---- hasMany ----
    GeoContinent.hasMany(models.GeoSubContinent, {
      foreignKey: "continent_id",
      as: "geoSubContinents",
      onDelete: "CASCADE",
    });

    GeoContinent.hasMany(models.GeoCountry, {
      foreignKey: "continent_id",
      as: "geoCountries",
      onDelete: "CASCADE",
    });
  }
}

GeoContinent.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
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

    modelName: "GeoContinent",
    tableName: "geo_continents",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default GeoContinent;
