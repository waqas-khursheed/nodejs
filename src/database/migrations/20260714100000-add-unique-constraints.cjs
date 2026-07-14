'use strict';

// Adds the unique constraints that were missing from the initial schema:
// duplicate coupon codes, product SKUs, category/brand slugs, and duplicate
// stock rows for the same product+variant combination were all previously
// possible at the DB level (only caught, race-prone, by app-level checks).
module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('coupons', {
      fields: ['code'],
      unique: true,
      name: 'coupons_code_unique',
    });

    await queryInterface.addIndex('products', {
      fields: ['sku'],
      unique: true,
      name: 'products_sku_unique',
    });

    await queryInterface.addIndex('brands', {
      fields: ['slug'],
      unique: true,
      name: 'brands_slug_unique',
    });

    // `slug` is a TEXT column, so MySQL requires an explicit key-prefix length.
    await queryInterface.addIndex('product_categories', {
      fields: [{ name: 'slug', length: 191 }],
      unique: true,
      name: 'product_categories_slug_unique',
    });

    await queryInterface.addIndex('stocks', {
      fields: ['product_id', 'color_id', 'size_id', 'fitting_id'],
      unique: true,
      name: 'stocks_variant_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('coupons', 'coupons_code_unique');
    await queryInterface.removeIndex('products', 'products_sku_unique');
    await queryInterface.removeIndex('brands', 'brands_slug_unique');
    await queryInterface.removeIndex('product_categories', 'product_categories_slug_unique');
    await queryInterface.removeIndex('stocks', 'stocks_variant_unique');
  },
};
