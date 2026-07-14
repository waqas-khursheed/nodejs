'use strict';

// Coupons previously had no expiry, usage cap, or minimum-order-amount fields
// at all — every coupon was implicitly "one use per customer, unlimited
// total uses, no expiry, no minimum spend" with nothing configurable.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('coupons', 'expires_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('coupons', 'usage_limit', {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: 'Max total redemptions across all customers. NULL = unlimited.',
    });

    await queryInterface.addColumn('coupons', 'used_count', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn('coupons', 'min_order_amount', {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('coupons', 'expires_at');
    await queryInterface.removeColumn('coupons', 'usage_limit');
    await queryInterface.removeColumn('coupons', 'used_count');
    await queryInterface.removeColumn('coupons', 'min_order_amount');
  },
};
