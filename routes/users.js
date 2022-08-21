const router = require('express').Router();
const {
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/users');

router.get('/users', getCurrentUser);
router.patch('/users/me', updateCurrentUser);

module.exports = router;
