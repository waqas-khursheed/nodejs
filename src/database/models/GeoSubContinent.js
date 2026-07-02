import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class GeoSubContinent extends Model {
  static associate(models) {
    // ---- belongsTo ----
    GeoSubContinent.belongsTo(models.GeoContinent, {
      foreignKey: "continent_id",
      as: "continent",
    });
  }
}

GeoSubContinent.init(
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

    continent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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

    modelName: "GeoSubContinent",
    tableName: "geo_sub_continents",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default GeoSubContinent;
