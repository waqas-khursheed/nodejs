import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class QueryForm extends Model {
  static associate(models) {}

}

QueryForm.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(95),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(95),
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    seen: {
      type: DataTypes.INTEGER,
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

    modelName: "QueryForm",
    tableName: "query_forms",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default QueryForm;
