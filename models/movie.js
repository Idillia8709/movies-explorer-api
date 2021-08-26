const mongoose = require('mongoose');

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
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/g.test(v);
      },
      message: 'Укажите корректную ссылку',
    },
  },
  trailer: {
    type: String,
    requered: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/g.test(v);
      },
      message: 'Укажите корректную ссылку',
    },
  },
  thumbnail: {
    type: String,
    requered: true,
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/g.test(v);
      },
      message: 'Укажите корректную ссылку',
    },
  },
  owner: {
    requered: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    requered: true,
    type: mongoose.Schema.Types.ObjectId,
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
