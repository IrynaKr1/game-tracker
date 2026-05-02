const { UserGame, GameNote } = require('../db/models');

const USER_ID = 1;

module.exports.getAllGames = async (req, res, next) => {
  try {
    const games = await UserGame.findAll({
      raw: true,
      where: { user_id: USER_ID },
      include: {
        model: GameNote,
        as: 'notes',
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    res.status(200).send({ data: games });
  } catch (error) {
    next(error);
  }
};

module.exports.getGameById = async (req, res, next) => {};
module.exports.addGame = async (req, res, next) => {};
module.exports.updateGameById = async (req, res, next) => {};
module.exports.deleteGameById = async (req, res, next) => {};
