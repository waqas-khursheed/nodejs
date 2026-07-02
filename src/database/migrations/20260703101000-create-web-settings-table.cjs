'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('web_settings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      main_logo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      fav_icon: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      website_link: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      website_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      meta_keywords: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      meta_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING(95),
        allowNull: true,
      },

      phone_one: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },

      phone_two: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },

      copyright: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      footer_widget_1: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },

      footer_widget_2: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },

      footer_widget_3: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },

      footer_widget_4: {
        type: Sequelize.STRING(25),
        allowNull: true,
      },

      payment_logo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      service_for: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "both",
      },

      dynamic_module_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "Brand",
      },

      delivery_days: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      delivery_start_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      delivery_end_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },

      min_amount_for_free_delivery: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      shipping_rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      location_mod: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      delivery_days_time_mod: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      footer_payment_logo_mod: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      update_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('web_settings');
  },
};
