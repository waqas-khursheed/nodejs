'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mobile_card', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      card_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,

        references: {
          model: 'card_details',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      card_no: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      percentage: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

      device_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mobile_card');
  },
};
