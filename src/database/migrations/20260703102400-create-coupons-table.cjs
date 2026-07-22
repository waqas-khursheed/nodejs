'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coupons', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      percentage: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      to_all: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      usage_limit: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Max total redemptions across all customers. NULL = unlimited.',
      },

      used_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      min_order_amount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('coupons', {
      fields: ['code'],
      unique: true,
      name: 'coupons_code_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('coupons');
  },
};
