require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://www.ervossa.students.nomoreparties.co',
    'https://www.ervossa.students.nomoreparties.co',
    'http://ervossa.students.nomoreparties.co',
    'https://ervossa.students.nomoreparties.co',
  ],
  credentials: true,
}));

//app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
console.log(process.env.JWT_SECRET);
