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

      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      admin_note: {
        type: Sequelize.TEXT,
        allowNull: true,
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

      order_id: {
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {
          model: 'orders',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,
      },

      order_detail_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      requested_stock_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('exchanges', {
      fields: ['order_id'],
      name: 'exchanges_order_id_idx',
    });

    await queryInterface.addIndex('exchanges', {
      fields: ['user_id'],
      name: 'exchanges_user_id_idx',
    });

    await queryInterface.addIndex('exchanges', {
      fields: ['order_detail_id'],
      name: 'exchanges_order_detail_id_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('exchanges');
  },
};
