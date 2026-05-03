const path = require('path');

const GAME_STATUS = {
  NOT_STARTED: 'Not started',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
};

const GAME_STATUS_LIST = Object.values(GAME_STATUS);

const STATIC_PATH = path.join(__dirname, process.env.STATIC_FOLDER);

module.exports = { GAME_STATUS, GAME_STATUS_LIST, STATIC_PATH };
