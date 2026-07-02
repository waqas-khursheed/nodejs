'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('application_slides', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('application_slides');
  },
};
