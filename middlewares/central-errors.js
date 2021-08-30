const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND } = require('../configs/errors');

module.exports = (error, req, res, next) => {
  const { message } = error;
  const statusCode = error.statusCode || 500;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next(new NotFoundError(NOT_FOUND));
};
