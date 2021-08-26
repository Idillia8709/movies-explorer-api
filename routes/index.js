const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { createUser, login, userLogout } = require('../controllers/users');
const { signupValidator, signinValidator } = require('../middlewares/validations');
const { NOT_FOUND } = require('../configs/errors');

router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);

router.post('/signout', userLogout);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
});

module.exports = router;
