'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('size_charts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      chart_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      chart_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      chart_slug: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('size_charts');
  },
};
