'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      slug: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      short_desc: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      long_desc: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      features: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      inside_box: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      price: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },

      d_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      d_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      dis_start_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      dis_end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      sku: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      sold: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      video_1: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      video_2: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      chart_image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      featured_image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      hovered_image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      featured_image_alt: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      featured_image_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      hovered_image_alt: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      hovered_image_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      size_chart_alt: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      size_chart_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {
          model: 'brands',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      is_variation: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },

      is_prescription: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },

      weight: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      new_arrival: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      best_seller: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      meta_keywords: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      meta_description: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};
