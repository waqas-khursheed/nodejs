'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      n_title: {
        type: Sequelize.STRING(99),
        allowNull: false,
      },

      n_desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      table_name: {
        type: Sequelize.STRING(99),
        allowNull: false,
      },

      row_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      seen: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notifications');
  },
};
