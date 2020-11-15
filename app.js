require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://www.erixvossa.students.nomoreparties.co',
    'https://www.erixvossa.students.nomoreparties.co',
    'http://erixvossa.students.nomoreparties.co',
    'https://erixvossa.students.nomoreparties.co',
  ],
  credentials: true,
}));
app.use(routes);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
