const router = require('express').Router();
const { getUserInfo, changeUser } = require('../controllers/users');
const { userMeValidator } = require('../middlewares/validations');

router.get('/me', getUserInfo);
router.patch('/me', userMeValidator, changeUser);

module.exports = router;
