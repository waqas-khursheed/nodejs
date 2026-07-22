'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      is_admin: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      is_active: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('admins');
  },
};
