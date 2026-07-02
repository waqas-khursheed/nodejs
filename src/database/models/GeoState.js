import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class GeoState extends Model {
  static associate(models) {
    // ---- hasMany ----
    GeoState.hasMany(models.GeoCity, {
      foreignKey: "state_id",
      as: "geoCities",
      onDelete: "CASCADE",
    });

    // ---- belongsTo ----
    GeoState.belongsTo(models.GeoCountry, {
      foreignKey: "country_id",
      as: "country",
    });
  }
}

GeoState.init(
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

    hasc: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    order_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

    modelName: "GeoState",
    tableName: "geo_states",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default GeoState;
