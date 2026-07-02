'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('side_banners', {
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

      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('side_banners');
  },
};
