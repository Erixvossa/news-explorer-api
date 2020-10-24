const express = require('express');
const { validateID, validateArticle } = require('../middlewares/requestValidation');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

const articlesRouter = express.Router();

articlesRouter.get('/', getArticles);
articlesRouter.post('/', validateArticle, createArticle);
articlesRouter.delete('/:_id', validateID, deleteArticle);

module.exports = articlesRouter;
