'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      order_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

        references: {
          model: 'users',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      user_ip: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      status: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },

      pay_method: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      shipping: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      sub_total: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      coupon_discount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },

      coupon_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      card_discount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      card_no: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      rewards_discount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      grand_total: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      delivery_day: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      delivery_start_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },

      delivery_end_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },

      payment_status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: "pending",
      },

      order_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      is_deduction: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },

      seen: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  },
};
