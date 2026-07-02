'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('faqs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      question: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      answer: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      slug: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'faq_categories',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('faqs');
  },
};
