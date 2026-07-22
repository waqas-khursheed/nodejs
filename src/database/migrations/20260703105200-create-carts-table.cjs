'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      stock_id: {
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

      size_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      fitting_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: true,

        references: {
          model: 'users',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      device_id: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      user_ip: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      composite_attribute_key: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      is_coupon: {
        type: Sequelize.STRING,
        defaultValue: "0",
      },

      is_card: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      coupon_discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });

    await queryInterface.addIndex('carts', {
      fields: ['user_id'],
      name: 'carts_user_id_idx',
    });

    await queryInterface.addIndex('carts', {
      fields: ['device_id'],
      name: 'carts_device_id_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('carts');
  },
};
