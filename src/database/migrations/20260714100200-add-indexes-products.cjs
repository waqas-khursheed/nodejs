'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('products', {
      fields: [{ name: 'slug', length: 191 }],
      name: 'products_slug_idx',
    });

    await queryInterface.addIndex('products', {
      fields: ['status'],
      name: 'products_status_idx',
    });

    await queryInterface.addIndex('products', {
      fields: ['brand_id'],
      name: 'products_brand_id_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('products', 'products_slug_idx');
    await queryInterface.removeIndex('products', 'products_status_idx');
    await queryInterface.removeIndex('products', 'products_brand_id_idx');
  },
};
