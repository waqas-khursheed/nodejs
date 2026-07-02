'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_details', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'orders',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

      color_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      size_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      fitting_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      dis_price: {
        type: Sequelize.DOUBLE(11,2),
        allowNull: false,
      },

      total: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      composite_attribute_key: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_details');
  },
};
