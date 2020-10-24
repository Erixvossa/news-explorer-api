const userRouter = require('express').Router();
const { getUser } = require('../controllers/user');

userRouter.get('/me', getUser);

module.exports = userRouter;
