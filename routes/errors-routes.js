const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND } = require('../configs/errors');

router.all('/*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
});

module.exports = router;
