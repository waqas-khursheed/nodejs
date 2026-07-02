'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('random_coupons', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      coupon_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      coupon_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      deduction: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      starts_at: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      ends_at: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      coupon_usage: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      status: {
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
    await queryInterface.dropTable('random_coupons');
  },
};
