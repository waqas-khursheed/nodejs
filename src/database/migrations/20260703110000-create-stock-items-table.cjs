'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stock_items', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      composite_stock_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      stock_id: {
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {
          model: 'stocks',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      item_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stock_items');
  },
};
