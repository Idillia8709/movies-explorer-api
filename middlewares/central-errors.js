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

  next();
};
