const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { authErrorMsg } = require('../utils/constants');
const { NODE_ENV, SECRET_DEV_KEY, JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(authErrorMsg);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_DEV_KEY);
  } catch (err) {
    throw new AuthError(authErrorMsg);
  }

  req.user = payload;

  next();
};
