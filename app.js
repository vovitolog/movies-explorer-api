const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const cors = require('./middlewares/cors-protection');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rate-limiter');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(router);
app.use(rateLimiter);
app.use(cors);
app.use(requestLogger);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
