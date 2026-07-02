import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Notification extends Model {
  static associate(models) {}

}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    n_title: {
      type: DataTypes.STRING(99),
      allowNull: false,
    },

    n_desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    table_name: {
      type: DataTypes.STRING(99),
      allowNull: false,
    },

    row_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    seen: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,

    modelName: "Notification",
    tableName: "notifications",

    timestamps: false,
  }
);

export default Notification;
