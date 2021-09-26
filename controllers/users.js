const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const { CURRENT_JWT_SECRET } = require('../configs/index');
const {
  NOT_FOUND,
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
} = require('../configs/errors');

module.exports.getUserInfo = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) throw new NotFoundError(NOT_FOUND);
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports.changeUser = (req, res, next) => {
  const userId = req.user._id;
  const newName = req.body.name;
  const newEmail = req.body.email;
  User.findOne({ email: newEmail })
    .then((email) => {
      if (email) throw new ConflictError(CONFLICT);
      User.findByIdAndUpdate(
        { _id: userId },
        { name: newName, email: newEmail },
        { new: true, runValidators: true },
      )
        .then((user) => {
          if (user) {
            res.send({
              email: user.email,
              name: user.name,
            });
          }
        })
        .catch((error) => {
          if (error.name === 'CastError' || error.name === 'ValidationError') {
            next(new BadRequestError(BAD_REQUEST));
          } else next(error);
        });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  if (!email || !password || !name) throw new BadRequestError(BAD_REQUEST);
  User.findOne({ email })
    .then(async (mail) => {
      if (mail) throw new ConflictError(CONFLICT);
      try {
        const hash = await bcrypt.hash(password, 10);
        User.create({
          name, email, password: hash,
        })
          .then((user) => {
            res.status(201).send({
              name: user.name,
              email: user.email,
            });
          });
      } catch (error) {
        if (error.name === 'CastError' || error.name === 'ValidationError') {
          next(new BadRequestError(BAD_REQUEST));
        } else next(error);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, CURRENT_JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
        .send({ answer: 'cookie' });
    })
    .catch(() => {
      throw new UnauthorizedError(UNAUTHORIZED);
    })
    .catch(next);
};

module.exports.userLogout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: true,
  })
    .end();
};
