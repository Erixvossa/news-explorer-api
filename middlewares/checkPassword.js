const BadRequestError = require('../errors/bad-request-error');

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (password.trim()) {
    next();
  } else {
    next(new BadRequestError('Поле "password" должно быть заполнено'));
  }
};

module.exports = checkPassword;
