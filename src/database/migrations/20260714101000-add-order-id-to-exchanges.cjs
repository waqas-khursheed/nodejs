'use strict';

// Exchange requests previously stored only a free-text order_number with no
// FK to the real order — any string could be submitted with no cross-check
// that the referenced order actually exists.
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('exchanges', 'order_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addIndex('exchanges', {
      fields: ['order_id'],
      name: 'exchanges_order_id_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('exchanges', 'exchanges_order_id_idx');
    await queryInterface.removeColumn('exchanges', 'order_id');
  },
};
