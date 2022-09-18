const router = require('express').Router();
const { updateCurrentUserValidation } = require('../middlewares/validation');

const {
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateCurrentUserValidation, updateCurrentUser);

module.exports = router;
