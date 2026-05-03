'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_games', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });
    await queryInterface.addColumn('user_games', 'genre', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('user_games', 'image', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('user_games', 'rawg_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_games', 'title');
    await queryInterface.removeColumn('user_games', 'genre');
    await queryInterface.removeColumn('user_games', 'image');

    await queryInterface.changeColumn('user_games', 'rawg_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
