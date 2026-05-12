'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('password_resets', {
      email: {
        type: Sequelize.STRING(191),
        allowNull: false,
      },

      token: {
        type: Sequelize.STRING(191),
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('password_resets', ['email']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('password_resets');
  },
};