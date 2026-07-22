'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assign_cat_to_products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'products',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'product_categories',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });

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
    await queryInterface.dropTable('assign_cat_to_products');
  },
};
