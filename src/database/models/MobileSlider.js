import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class MobileSlider extends Model {
  static associate(models) {}

}

MobileSlider.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    status: {
      type: DataTypes.TINYINT,
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

    modelName: "MobileSlider",
    tableName: "mobile_sliders",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default MobileSlider;
