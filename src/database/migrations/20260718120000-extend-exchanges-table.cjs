'use strict';

// Exchange requests previously carried only free-text order_number/item name/
// size fields — no link to the real order line item or a real replacement
// variant, and no status beyond `seen` (read/unread). This adds:
//  - user_id: the requesting customer's account (creation now requires auth)
//  - order_detail_id: the exact line item being returned
//  - requested_stock_id: the specific variant wanted instead (nullable —
//    not every exchange has a same-product replacement)
//  - status: 0 Pending, 1 Approved, 2 Rejected, 3 Completed
//  - admin_note: shown back to the customer when a decision is made
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('exchanges', 'user_id', {
      type: Sequelize.BIGINT.UNSIGNED,
      allowNull: true,
      after: 'order_id',
    });

    await queryInterface.addColumn('exchanges', 'order_detail_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: 'user_id',
    });

    await queryInterface.addColumn('exchanges', 'requested_stock_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: 'order_detail_id',
    });

    await queryInterface.addColumn('exchanges', 'status', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      after: 'seen',
    });

    await queryInterface.addColumn('exchanges', 'admin_note', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: 'status',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('exchanges', 'admin_note');
    await queryInterface.removeColumn('exchanges', 'status');
    await queryInterface.removeColumn('exchanges', 'requested_stock_id');
    await queryInterface.removeColumn('exchanges', 'order_detail_id');
    await queryInterface.removeColumn('exchanges', 'user_id');
  },
};
