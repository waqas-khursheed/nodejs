'use strict';

// "Notify me when back in stock" subscriptions for out-of-stock products.
// `stock_id` is nullable — null means the alert watches the product's own
// `quantity` (non-variant items); a real id scopes it to one variant.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stock_alerts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      stock_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      notified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('stock_alerts', ['product_id', 'stock_id', 'notified_at']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('stock_alerts');
  },
};
