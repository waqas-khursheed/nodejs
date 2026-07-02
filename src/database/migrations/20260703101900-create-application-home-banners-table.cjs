'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('application_home_banners', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('application_home_banners');
  },
};
