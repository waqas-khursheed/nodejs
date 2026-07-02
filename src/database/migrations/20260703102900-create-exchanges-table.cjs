'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exchanges', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      order_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      customer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      return_item_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      return_item_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      return_item_size: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      date: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      reason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      other_detail: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      required_item_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      required_item_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      required_item_size: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      seen: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('exchanges');
  },
};
