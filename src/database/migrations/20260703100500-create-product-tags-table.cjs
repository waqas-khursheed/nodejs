'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_tags', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(99),
        allowNull: false,
      },

      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      meta_title: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      meta_keywords: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      og_image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      icon: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      meta_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      body_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_tags');
  },
};
