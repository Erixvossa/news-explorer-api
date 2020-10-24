const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticles = (req, res, next) => {
  Article.find({})
    .populate('user')
    .then((articles) => res.status(200).send({ data: articles }))
    .catch((err) => {
      throw new ServerError({ message: `На сервере произошла ошибка: ${err.message}` });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .catch((err) => {
      throw new BadRequestError({ message: `Указаны некорректные данные при создании темы: ${err.message}` });
    })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params._id)
    .select('+owner')
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: 'Нет темы с таким id' });
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError({ message: 'Недостаточно прав для выполнения операции' });
      }
      Article.findByIdAndDelete(req.params._id)
        .then((articleData) => {
          res.send({ data: articleData });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
