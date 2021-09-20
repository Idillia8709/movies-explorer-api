const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userMeValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(20).required(),
  }),
});

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true })) {
        return value;
      }
      return helpers.message('Неверный формат ссылки');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true })) {
        return value;
      }
      return helpers.message('Неверный формат ссылки');
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true })) {
        return value;
      }
      return helpers.message('Неверный формат ссылки');
    }),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  signupValidator,
  signinValidator,
  userMeValidator,
  createMovieValidator,
  deleteMovieValidator,
};
