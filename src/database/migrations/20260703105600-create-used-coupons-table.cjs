'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('used_coupons', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('used_coupons', {
      fields: ['user_id', 'coupon_id'],
      unique: true,
      name: 'used_coupons_user_coupon_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('used_coupons');
  },
};
