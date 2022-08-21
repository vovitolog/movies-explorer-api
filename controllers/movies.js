const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => {
  Movie.find({})
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
    trailer,
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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError('Введены некорректные данные при создании фильма'),
        );
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError('Нет прав для удаления фильма'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
