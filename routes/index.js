const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const articleRouter = require('./articles');
const checkPassword = require('../middlewares/checkPassword');
const { validateUserBody, validateAuthentication } = require('../middlewares/requestValidation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validateUserBody, checkPassword, createUser);
router.post('/signin', validateAuthentication, checkPassword, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
