const { Router } = require('express');
const gamesRouter = require('./gamesRouter');

const router = Router();

router.use('/games', gamesRouter);

module.exports = router;
