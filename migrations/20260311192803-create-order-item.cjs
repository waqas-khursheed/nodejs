'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_items", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED, // FK safe
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: Sequelize.BIGINT.UNSIGNED, // must match orders.id
        allowNull: false,
        references: {
          model: "orders",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      product_id: {
        type: Sequelize.BIGINT.UNSIGNED, // must match products.id
        allowNull: false,
        references: {
          model: "products",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      price: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
      total: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("order_items");
  }
};