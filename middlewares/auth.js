const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { UNAUTHORIZED } = require('../configs/errors');

const { CURRENT_JWT_SECRET } = require('../configs/index');

module.exports = (req, res, next) => {
  const extractToken = req.cookies.token;
  if (!extractToken) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }
  let payload;
  try {
    payload = jwt.verify(extractToken, CURRENT_JWT_SECRET);
  } catch (error) {
    next(new UnauthorizedError(UNAUTHORIZED));
  }
  req.user = payload;
  return next();
};
