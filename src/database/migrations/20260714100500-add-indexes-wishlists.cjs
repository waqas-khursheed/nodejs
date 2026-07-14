'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('wishlists', {
      fields: ['user_id', 'product_id'],
      name: 'wishlists_user_product_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('wishlists', 'wishlists_user_product_idx');
  },
};
