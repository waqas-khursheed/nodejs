'use strict';

// Orders are filtered by user_id/status/payment_status on nearly every admin
// and user list endpoint, and order_number is looked up directly — none of
// these had an index, forcing a full table scan as the table grows.
module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('orders', {
      fields: ['user_id'],
      name: 'orders_user_id_idx',
    });

    await queryInterface.addIndex('orders', {
      fields: ['status'],
      name: 'orders_status_idx',
    });

    await queryInterface.addIndex('orders', {
      fields: ['payment_status'],
      name: 'orders_payment_status_idx',
    });

    await queryInterface.addIndex('orders', {
      fields: ['order_number'],
      unique: true,
      name: 'orders_order_number_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('orders', 'orders_user_id_idx');
    await queryInterface.removeIndex('orders', 'orders_status_idx');
    await queryInterface.removeIndex('orders', 'orders_payment_status_idx');
    await queryInterface.removeIndex('orders', 'orders_order_number_unique');
  },
};
