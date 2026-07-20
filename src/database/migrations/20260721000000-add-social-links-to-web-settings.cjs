'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('web_settings', 'facebook', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('web_settings', 'instagram', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('web_settings', 'twitter', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('web_settings', 'youtube', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('web_settings', 'facebook');
    await queryInterface.removeColumn('web_settings', 'instagram');
    await queryInterface.removeColumn('web_settings', 'twitter');
    await queryInterface.removeColumn('web_settings', 'youtube');
  },
};
