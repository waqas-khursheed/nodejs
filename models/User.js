// models/user.js
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM("USER", "ADMIN"),
        defaultValue: "USER",
        allowNull: false
      }
    },
    {
      tableName: "users",
      underscored: true
    }
  );

  return User;
};
