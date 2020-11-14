const router = require('express').Router();
const { getUser } = require('../controllers/user');

router.get('/me', getUser);

module.exports = router;
