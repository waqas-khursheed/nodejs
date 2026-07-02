'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('slides', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      Heading: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      bullet_1: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      bullet_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      bullet_3: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      link: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('slides');
  },
};
