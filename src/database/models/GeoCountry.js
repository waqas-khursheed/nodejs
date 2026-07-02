import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class GeoCountry extends Model {
  static associate(models) {
    // ---- hasMany ----
    GeoCountry.hasMany(models.GeoState, {
      foreignKey: "country_id",
      as: "geoStates",
      onDelete: "CASCADE",
    });

    GeoCountry.hasMany(models.GeoCity, {
      foreignKey: "country_id",
      as: "geoCities",
      onDelete: "CASCADE",
    });

    // ---- belongsTo ----
    GeoCountry.belongsTo(models.GeoContinent, {
      foreignKey: "continent_id",
      as: "continent",
    });
  }
}

GeoCountry.init(
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

    cca2: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },

    cca3: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },

    ccn3: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    continent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },

    sub_continent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
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

    modelName: "GeoCountry",
    tableName: "geo_countries",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default GeoCountry;
