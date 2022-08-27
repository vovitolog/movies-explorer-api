const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  moviesNotFoundMsg,
  badRequestMsg,
  movieNotFoundMsg,
  deleteMovieSuccessfulMsg,
  deleteMovieForbiddenMsg,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new NotFoundError(moviesNotFoundMsg))
    .then((movies) => res.send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestMsg));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => new NotFoundError(movieNotFoundMsg))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError(deleteMovieForbiddenMsg));
      }
      return movie
        .remove()
        .then(() => res.send({ message: deleteMovieSuccessfulMsg }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
