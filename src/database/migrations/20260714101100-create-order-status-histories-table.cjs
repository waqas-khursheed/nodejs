'use strict';

// Orders previously had no audit trail — status/payment_status were
// overwritten in place with no record of the previous value, when it
// changed, or which admin changed it.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_status_histories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'orders',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      field: {
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: '"status" or "payment_status"',
      },

      from_value: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      to_value: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      changed_by_admin_id: {
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {
          model: 'admins',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('order_status_histories', {
      fields: ['order_id'],
      name: 'order_status_histories_order_id_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('order_status_histories');
  },
};
