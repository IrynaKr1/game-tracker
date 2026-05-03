const { Router } = require('express');
const { gamesController } = require('../controllers');
const { upload } = require('../middleware');

const gamesRouter = Router();

gamesRouter
  .route('/')
  .get(gamesController.getAllGames)
  .post(upload.uploadGameImage, gamesController.addGame);

gamesRouter
  .route('/:id')
  .get(gamesController.getGameById)
  .patch(upload.uploadGameImage, gamesController.updateGameById)
  .delete(gamesController.deleteGameById);

module.exports = gamesRouter;
