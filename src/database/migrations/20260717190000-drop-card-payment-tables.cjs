'use strict';

// Card/bank payment discount feature removed — cash on delivery only for now.
// Drop order respects FKs: mobile_card -> card_details -> {banks, card_categories, card_types}.
module.exports = {
  async up(queryInterface) {
    await queryInterface.dropTable('mobile_card');
    await queryInterface.dropTable('card_details');
    await queryInterface.dropTable('banks');
    await queryInterface.dropTable('card_categories');
    await queryInterface.dropTable('card_types');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createTable('card_categories', {
      id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      card_category: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: true },
      updated_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.createTable('card_types', {
      id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      card_type: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: true },
      updated_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.createTable('banks', {
      id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      bank_title: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, allowNull: true },
      updated_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.createTable('card_details', {
      id: { type: Sequelize.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
      card_no: { type: Sequelize.INTEGER, allowNull: false },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'countries', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      card_category_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: { model: 'card_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      card_type_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: { model: 'card_types', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      bank_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: { model: 'banks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 0 },
      percentage: { type: Sequelize.DOUBLE, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: true },
      updated_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.createTable('mobile_card', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      card_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: { model: 'card_details', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      card_no: { type: Sequelize.INTEGER, allowNull: true },
      percentage: { type: Sequelize.INTEGER, allowNull: true },
      device_id: { type: Sequelize.STRING, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },
};
