'use strict';

// These columns were never consumed anywhere: `service_for` and
// `dynamic_module_name` were never even exposed in the admin UI (dead schema
// cruft from initial scaffolding); `footer_widget_1..4`, `payment_logo` and
// `footer_payment_logo_mod` were editable in the admin panel but never read
// by the storefront (frontend_user), so saving them had no real effect.
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn('web_settings', 'service_for');
    await queryInterface.removeColumn('web_settings', 'dynamic_module_name');
    await queryInterface.removeColumn('web_settings', 'footer_widget_1');
    await queryInterface.removeColumn('web_settings', 'footer_widget_2');
    await queryInterface.removeColumn('web_settings', 'footer_widget_3');
    await queryInterface.removeColumn('web_settings', 'footer_widget_4');
    await queryInterface.removeColumn('web_settings', 'payment_logo');
    await queryInterface.removeColumn('web_settings', 'footer_payment_logo_mod');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('web_settings', 'service_for', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'both',
    });
    await queryInterface.addColumn('web_settings', 'dynamic_module_name', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'Brand',
    });
    await queryInterface.addColumn('web_settings', 'footer_widget_1', {
      type: Sequelize.STRING(25),
      allowNull: true,
    });
    await queryInterface.addColumn('web_settings', 'footer_widget_2', {
      type: Sequelize.STRING(25),
      allowNull: true,
    });
    await queryInterface.addColumn('web_settings', 'footer_widget_3', {
      type: Sequelize.STRING(25),
      allowNull: true,
    });
    await queryInterface.addColumn('web_settings', 'footer_widget_4', {
      type: Sequelize.STRING(25),
      allowNull: true,
    });
    await queryInterface.addColumn('web_settings', 'payment_logo', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('web_settings', 'footer_payment_logo_mod', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },
};
