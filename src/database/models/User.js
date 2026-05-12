import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db.js";

class User extends Model {
  static associate(models) {
    /*
    =========================================
    USER RELATIONSHIPS
    =========================================
    */

    // User -> Orders
    // User.hasMany(models.Order, {
    //   foreignKey: "user_id",
    //   as: "orders",
    // });

    // User -> Cart
    // User.hasOne(models.Cart, {
    //   foreignKey: "user_id",
    //   as: "cart",
    // });

    // User -> Reviews
    // User.hasMany(models.Review, {
    //   foreignKey: "user_id",
    //   as: "reviews",
    // });

    // User -> Wishlist
    // User.hasMany(models.Wishlist, {
    //   foreignKey: "user_id",
    //   as: "wishlists",
    // });
  }
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    company_name: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    auth_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    remember_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    provider_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    provider_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    is_active: {
      type: DataTypes.INTEGER,
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

    modelName: "User",
    tableName: "users",

    timestamps: true,

    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default User;