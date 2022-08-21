// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/not-found-error');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate(
    { _id: userId },
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  updateCurrentUser,
};
