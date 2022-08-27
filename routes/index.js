const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { pageNotFoundMsg } = require('../utils/constants');

router.use(require('./auth'));
router.use(auth, require('./users'));
router.use(auth, require('./movies'));

router.use(('*', () => {
  throw new NotFoundError(pageNotFoundMsg);
}));

module.exports = router;
