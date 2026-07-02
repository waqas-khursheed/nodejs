'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      email_verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      company_name: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      auth_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      remember_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      provider_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      provider_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      is_active: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
