'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_categories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },

      slug: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      meta_title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      icon: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      meta_keywords: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      meta_desc: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      size_chart_mobile: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      size_chart: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      is_size_chart: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },

      parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      order_by: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_categories');
  },
};
