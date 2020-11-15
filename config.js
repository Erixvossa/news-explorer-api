const { PORT = 3000, JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
};
