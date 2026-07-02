'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meta_coupon_categories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      cat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'product_categories',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      coupon_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'coupons',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('meta_coupon_categories');
  },
};
