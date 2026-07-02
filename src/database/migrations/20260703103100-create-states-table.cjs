'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('states', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },

      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,

        references: {
          model: 'countries',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('states');
  },
};
