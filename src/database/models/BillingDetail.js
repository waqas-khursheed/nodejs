import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class BillingDetail extends Model {
  static associate(models) {
    // ---- belongsTo ----
    BillingDetail.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
  }
}

BillingDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address_1: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    address_2: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    postcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "BillingDetail",
    tableName: "billing_details",

    timestamps: false,
  }
);

export default BillingDetail;
