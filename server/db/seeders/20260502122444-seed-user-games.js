'use strict';
const { GAME_STATUS } = require('../../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'ira@example.com';`
    );
    const userId = users[0].id;

    await queryInterface.bulkInsert('user_games', [
      {
        user_id: userId,
        rawg_id: 326243,
        title: 'Elden Ring',
        genre: 'RPG',
        status: GAME_STATUS.IN_PROGRESS,
        rating: null,
        playtime: 80,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: userId,
        rawg_id: 3328,
        title: 'The Witcher 3',
        genre: 'RPG',
        status: GAME_STATUS.COMPLETED,
        rating: 4.8,
        playtime: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: userId,
        rawg_id: 58175,
        title: 'God of War',
        genre: 'Action',
        status: GAME_STATUS.IN_PROGRESS,
        rating: null,
        playtime: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: userId,
        rawg_id: 41494,
        title: 'Cyberpunk 2077',
        genre: 'RPG',
        status: GAME_STATUS.NOT_STARTED,
        rating: null,
        playtime: 60,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_games', null, {});
  },
};
