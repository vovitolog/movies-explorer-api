const router = require('express').Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', addMovie);
router.delete('movies/:movieId', deleteMovie);

module.exports = router;
