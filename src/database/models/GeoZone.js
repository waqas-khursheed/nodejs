import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class GeoZone extends Model {
  static associate(models) {}

}

GeoZone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(50),
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

    modelName: "GeoZone",
    tableName: "geo_zones",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default GeoZone;
