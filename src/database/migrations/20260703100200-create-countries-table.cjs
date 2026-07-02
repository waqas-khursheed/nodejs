'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('countries', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      country_code: {
        type: Sequelize.STRING(2),
        allowNull: false,
        defaultValue: "",
      },

      country_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('countries');
  },
};
