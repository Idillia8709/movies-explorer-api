const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieShema = new mongoose.Schema({
  country: {
    type: String,
    requered: true,
  },
  director: {
    type: String,
    requered: true,
  },
  duration: {
    type: Number,
    requered: true,
  },
  year: {
    type: String,
    requered: true,
  },
  description: {
    type: String,
    requered: true,
  },
  image: {
    type: String,
    requered: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильная ссылка',
    },
  },
  trailer: {
    type: String,
    requered: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильная ссылка',
    },
  },
  thumbnail: {
    type: String,
    requered: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильная ссылка',
    },
  },
  owner: {
    requered: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    requered: true,
    type: Number,
    ref: 'MoviesExplorer',
  },
  nameRU: {
    type: String,
    requered: true,
  },
  maneEn: {
    type: String,
    requered: true,
  },
});

module.exports = mongoose.model('movie', movieShema);
