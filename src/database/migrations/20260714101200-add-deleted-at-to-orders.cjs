'use strict';

// Orders were hard-deleted, cascading away the entire sales record (line
// items, billing address) with no way to reconstruct historical revenue/tax
// records. Soft-delete (paranoid) keeps the row and just hides it from
// normal queries.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('orders', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('orders', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('orders', 'deleted_at');
    await queryInterface.removeColumn('orders', 'updated_at');
  },
};
