'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('carts', {
      fields: ['user_id'],
      name: 'carts_user_id_idx',
    });

    await queryInterface.addIndex('carts', {
      fields: ['device_id'],
      name: 'carts_device_id_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('carts', 'carts_user_id_idx');
    await queryInterface.removeIndex('carts', 'carts_device_id_idx');
  },
};
