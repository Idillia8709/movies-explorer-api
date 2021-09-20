const router = require('express').Router();
const errorsRoutes = require('./errors-routes');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { createUser, login, userLogout } = require('../controllers/users');
const { signupValidator, signinValidator } = require('../middlewares/validations');

router.use('/signup', signupValidator, createUser);
router.use('/signin', signinValidator, login);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/signout', userLogout);

router.use('/', errorsRoutes);

module.exports = router;
