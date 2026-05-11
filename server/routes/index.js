const { Router } = require('express');
const gamesRouter = require('./gamesRouter');
const rawgRouter = require('./rawgRouter');

const router = Router();

router.use('/games', gamesRouter);
router.use('/rawg', rawgRouter);

module.exports = router;
