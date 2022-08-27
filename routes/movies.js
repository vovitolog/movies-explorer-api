const router = require('express').Router();
const { addMovieValidation, deleteMovieValidation } = require('../middlewares/validation');
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.post('/movies', addMovieValidation, addMovie);
router.get('/movies', getMovies);
router.delete('movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
