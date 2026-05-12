const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PasswordReset = sequelize.define(
  'PasswordReset',
  {
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },

    token: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'password_resets',
    timestamps: false,
  }
);

module.exports = PasswordReset;