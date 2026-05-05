const createHttpError = require('http-errors');
const _ = require('lodash');
const fs = require('fs');
const { UserGame, GameNote } = require('../db/models');

const USER_ID = 2;

module.exports.addGame = async (req, res, next) => {
  const { body, file } = req;
  try {
    if (file) {
      body.image = file.filename;
    }

    body.userId = USER_ID;

    const createdGame = await UserGame.create({
      userId: USER_ID,
      title: body.title,
      genre: body.genre,
      status: body.status,
      playtime: body.playtime,
      image: file ? file.filename : null,
    });

    if (!createdGame) {
      return next(createHttpError(400, 'Something went wrong'));
    }

    const preparedGame = _.omit(createdGame.get(), ['createdAt', 'updatedAt']);

    res.status(201).send({ data: preparedGame });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllGames = async (req, res, next) => {
  try {
    const games = await UserGame.findAll({
      raw: true,
      where: { user_id: USER_ID },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    console.log('games:', JSON.stringify(games));

    res.status(200).send({ data: games });
  } catch (error) {
    next(error);
  }
};
module.exports.getGameById = async (req, res, next) => {};
module.exports.updateGameById = async (req, res, next) => {};
module.exports.deleteGameById = async (req, res, next) => {
  try {
    const game = await UserGame.findByPk(req.params.id);

    if (!game || game.userId !== USER_ID) {
      return next(createHttpError(404, 'Game not found'));
    }

    if (game.image) {
      const imagePath = path.join(STATIC_PATH, 'images', game.image);
      fs.unlink(imagePath, () => {});
    }
    await game.destroy();

    res.json({ message: 'A game was deleted' });
  } catch (error) {
    next(error);
  }
};
