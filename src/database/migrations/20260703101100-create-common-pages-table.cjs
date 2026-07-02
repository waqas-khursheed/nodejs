'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('common_pages', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      heading: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      page_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('common_pages');
  },
};
