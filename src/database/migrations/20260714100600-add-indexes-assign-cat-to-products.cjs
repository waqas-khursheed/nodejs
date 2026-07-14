'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('assign_cat_to_products', {
      fields: ['product_id'],
      name: 'assign_cat_to_products_product_id_idx',
    });

    await queryInterface.addIndex('assign_cat_to_products', {
      fields: ['category_id'],
      name: 'assign_cat_to_products_category_id_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('assign_cat_to_products', 'assign_cat_to_products_product_id_idx');
    await queryInterface.removeIndex('assign_cat_to_products', 'assign_cat_to_products_category_id_idx');
  },
};
