const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

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

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => User.create({
    name, email, password: hash,
  })).then((user) => {
    res.status(201).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    });
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Введены некорректные данные'));
    } else if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким e-mail уже существует'));
    } else {
      next(err);
    }
  });
};

module.exports = {
  getCurrentUser,
  updateCurrentUser,
  login,
  createUser,
};
