'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stocks', {
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

      stock_qty: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      stock_dis_price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      stock_dis_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      stock_dis_from_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      stock_dis_to_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      stock_dis_from_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },

      stock_dis_to_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },

      stock_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      weight: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },

      color_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      size_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      fitting_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('stocks', {
      fields: ['product_id', 'color_id', 'size_id', 'fitting_id'],
      unique: true,
      name: 'stocks_variant_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('stocks');
  },
};
