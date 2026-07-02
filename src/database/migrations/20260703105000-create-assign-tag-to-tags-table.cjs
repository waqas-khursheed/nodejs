'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assign_tag_to_tags', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      meta_tag: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'product_tags',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('assign_tag_to_tags');
  },
};
