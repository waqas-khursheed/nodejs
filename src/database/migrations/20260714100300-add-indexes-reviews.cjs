'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('reviews', {
      fields: ['product_id'],
      name: 'reviews_product_id_idx',
    });

    await queryInterface.addIndex('reviews', {
      fields: ['status'],
      name: 'reviews_status_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('reviews', 'reviews_product_id_idx');
    await queryInterface.removeIndex('reviews', 'reviews_status_idx');
  },
};
