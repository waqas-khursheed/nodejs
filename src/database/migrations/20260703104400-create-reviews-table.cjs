'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
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

      review: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,

        references: {
          model: 'users',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      is_verified_purchase: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
    });

    await queryInterface.addIndex('reviews', {
      fields: ['product_id'],
      name: 'reviews_product_id_idx',
    });

    await queryInterface.addIndex('reviews', {
      fields: ['status'],
      name: 'reviews_status_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('reviews');
  },
};
