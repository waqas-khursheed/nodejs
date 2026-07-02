'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mobile_coupons', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      coupon_id: {
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {
          model: 'coupons',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      device_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      coupon_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      coupon_type: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      deduction: {
        type: Sequelize.DOUBLE(14,2),
        allowNull: true,
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mobile_coupons');
  },
};
