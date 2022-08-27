const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const BadRequestError = require('../errors/bad-request-error');
const { wrongUrlMsg } = require('../utils/constants');

const urlValidator = (url) => {
  if (!isURL(url, { require_protocol: true })) {
    throw new BadRequestError(wrongUrlMsg);
  }
  return url;
};

const updateCurrentUserValidation = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  },
);

const addMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidator),
    trailerLink: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    nameRU: Joi.string().required(),
    nameEN: Joi.required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidation = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

const signinValidation = celebrate(
  {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
);

const signupValidation = celebrate(
  {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
);

module.exports = {
  updateCurrentUserValidation,
  addMovieValidation,
  deleteMovieValidation,
  signinValidation,
  signupValidation,
};
