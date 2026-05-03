const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { STATIC_PATH } = require('./constants');
const { errorHandler } = require('./middleware');

const app = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

app.use(express.static(STATIC_PATH));

app.use(express.json());

app.use('/api', router);

module.exports = app;
