import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config/db.js";

class Review extends Model {
  static associate(models) {
    // ---- belongsTo ----
    Review.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });

    Review.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    is_verified_purchase: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,

    modelName: "Review",
    tableName: "reviews",

    timestamps: false,
  }
);

export default Review;
