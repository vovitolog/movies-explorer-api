const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../middlewares/validation');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

module.exports = router;
