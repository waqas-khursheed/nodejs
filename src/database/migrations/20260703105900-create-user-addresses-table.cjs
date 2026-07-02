'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_addresses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,

        references: {
          model: 'users',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      address1: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      country_id1: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'countries',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      state_id1: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'states',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      city_id1: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: 'cities',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      code1: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      address2: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },

      country_id2: {
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {
          model: 'countries',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      state_id2: {
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {
          model: 'states',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      city_id2: {
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {
          model: 'cities',
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      code2: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_addresses');
  },
};
