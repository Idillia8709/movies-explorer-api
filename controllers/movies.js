const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
} = require('../configs/errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST));
      } else next(error);
    });
};

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
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
    owner: userId,
  })
    .then((movie) => {
      if (movie) {
        res.send(movie);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError' || error.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      }
      if (error.message === 'PageNotFound') {
        next(new NotFoundError(NOT_FOUND));
      } else next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError(NOT_FOUND);
      const movieOwner = movie.owner.toString();
      if (owner !== movieOwner) throw new ForbiddenError(FORBIDDEN);
      Movie.findByIdAndDelete(req.params.movieId, { runValidators: true })
        .then(() => {
          res.send(movie);
        })
        .catch(next);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST));
      } else next(error);
    });
};
