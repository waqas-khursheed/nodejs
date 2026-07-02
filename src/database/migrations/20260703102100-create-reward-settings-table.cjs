'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reward_settings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      minimum_points: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      equal_to: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reward_settings');
  },
};
