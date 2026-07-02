import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class GeoCity extends Model {
  static associate(models) {
    // ---- belongsTo ----
    GeoCity.belongsTo(models.GeoCountry, {
      foreignKey: "country_id",
      as: "country",
    });

    GeoCity.belongsTo(models.GeoState, {
      foreignKey: "state_id",
      as: "state",
    });
  }
}

GeoCity.init(
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

    country_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },

    state_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },

    zone_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },

    latitude: {
      type: DataTypes.DECIMAL(9,6),
      defaultValue: 0,
    },

    longitude: {
      type: DataTypes.DECIMAL(9,6),
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

    modelName: "GeoCity",
    tableName: "geo_cities",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default GeoCity;
