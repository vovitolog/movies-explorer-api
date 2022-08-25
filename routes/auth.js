const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', login);
router.post('/signup', createUser);
router.use(('*', () => {
  throw new NotFoundError('Страница не найдена');
}));

module.exports = router;
