const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes');
const limiter = require('./utils/limiter');
const { CURRENT_PORT, BASE_URL } = require('./configs/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centrallError = require('./middlewares/central-errors');
const corsOption = require('./middlewares/cors');

const app = express();

app.use(limiter);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(BASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors(corsOption));

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(centrallError);

app.listen(CURRENT_PORT, () => CURRENT_PORT);
