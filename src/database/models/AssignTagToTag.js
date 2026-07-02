import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class AssignTagToTag extends Model {
  static associate(models) {
    // ---- belongsTo ----
    AssignTagToTag.belongsTo(models.ProductTag, {
      foreignKey: "tag_id",
      as: "tag",
    });
  }
}

AssignTagToTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    meta_tag: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    modelName: "AssignTagToTag",
    tableName: "assign_tag_to_tags",

    timestamps: false,
  }
);

export default AssignTagToTag;
