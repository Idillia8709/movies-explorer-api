const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');

const { CURRENT_PORT } = require('./configs/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(router);
app.use(errors());

app.use(errorLogger);

app.use((error, req, res, next) => {
  const { message } = error;
  const statusCode = error.statusCode || 500;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(CURRENT_PORT, () => console.log(`App listening on port ${CURRENT_PORT}`));
