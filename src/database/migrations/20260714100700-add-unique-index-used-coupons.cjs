'use strict';

// Enforces "one use per user per coupon" at the DB level as a safety net —
// previously this was only a check-then-insert in application code, which is
// race-prone under concurrent checkout requests.
module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('used_coupons', {
      fields: ['user_id', 'coupon_id'],
      unique: true,
      name: 'used_coupons_user_coupon_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('used_coupons', 'used_coupons_user_coupon_unique');
  },
};
