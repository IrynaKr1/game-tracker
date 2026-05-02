const { Router } = require('express');
const { gamesController } = require('../controllers');

const gamesRouter = Router();

gamesRouter
  .route('/')
  .get(gamesController.getAllGames)
  .post(gamesController.addGame);

gamesRouter
  .route('/:id')
  .get(gamesController.getGameById)
  .patch(gamesController.updateGameById)
  .delete(gamesController.deleteGameById);

module.exports = gamesRouter;
