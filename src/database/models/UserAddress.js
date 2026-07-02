import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class UserAddress extends Model {
  static associate(models) {
    // ---- belongsTo ----
    UserAddress.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    UserAddress.belongsTo(models.Country, {
      foreignKey: "country_id1",
      as: "country1",
    });

    UserAddress.belongsTo(models.State, {
      foreignKey: "state_id1",
      as: "state1",
    });

    UserAddress.belongsTo(models.City, {
      foreignKey: "city_id1",
      as: "city1",
    });

    UserAddress.belongsTo(models.Country, {
      foreignKey: "country_id2",
      as: "country2",
    });

    UserAddress.belongsTo(models.State, {
      foreignKey: "state_id2",
      as: "state2",
    });

    UserAddress.belongsTo(models.City, {
      foreignKey: "city_id2",
      as: "city2",
    });
  }
}

UserAddress.init(
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

    address1: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    country_id1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    state_id1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    city_id1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    code1: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    address2: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    country_id2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    state_id2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    city_id2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    code2: {
      type: DataTypes.STRING(200),
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

    modelName: "UserAddress",
    tableName: "user_addresses",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default UserAddress;
