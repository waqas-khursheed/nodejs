'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('billing_details', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      lastname: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'orders',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      company: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      address_1: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },

      address_2: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      postcode: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      state: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('billing_details');
  },
};
