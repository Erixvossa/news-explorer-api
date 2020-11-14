const router = require('express').Router();
const {
  createArticle, getArticles, deleteArticle,
} = require('../controllers/articles');
const { validateArticleBody, validateArticleId } = require('../middlewares/requestValidation');

router.post('/', validateArticleBody, createArticle);
router.get('/', getArticles);
router.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = router;

