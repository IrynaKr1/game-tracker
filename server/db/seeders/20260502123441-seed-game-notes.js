'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [games] = await queryInterface.sequelize.query(
      `SELECT ug.id, ug.rawg_id FROM user_games ug;`
    );

    const witcher = games.find(g => g.rawg_id === 3328);
    const eldenRing = games.find(g => g.rawg_id === 326243);

    await queryInterface.bulkInsert('game_notes', [
      {
        user_game_id: witcher.id,
        title: 'DLC ended',
        content: 'Ended 100% with DLC. Best RPG ever!',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_game_id: witcher.id,
        title: 'An alchemy tips',
        content:
          'Remember to gather ingredients in Velen, especially celandine. It is very common in this region and extremely useful for crafting potions and oils. Always keep an eye on your surroundings while exploring, and consider upgrading your alchemy skills to make better use of collected resources.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_game_id: eldenRing.id,
        title: 'Malenia',
        content: 'I need a strategy for Malenia. Try a bleed build.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('game_notes', null, {});
  },
};
