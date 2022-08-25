const router = require('express').Router();
const { addMovieValidation, deleteMovieValidation } = require('../middlewares/validation');
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', addMovieValidation, addMovie);
router.delete('movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
