const { Router } = require('express');
const { rawgController } = require('../controllers');

const rawgRouter = Router();
rawgRouter.get('/games/:rawgId', rawgController.getRawgGameById);

module.exports = rawgRouter;
