'use strict';
const { GAME_STATUS, GAME_STATUS_LIST } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      rawg_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(...GAME_STATUS_LIST),
        defaultValue: GAME_STATUS.NOT_STARTED,
      },
      rating: {
        type: Sequelize.DECIMAL(2, 1),
      },
      playtime: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex('user_games', ['user_id', 'rawg_id'], {
      unique: true,
      name: 'user_games_user_id_rawg_id_unique',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_games');
  },
};
