const { celebrate, Joi } = require('celebrate');

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
    image: Joi.string()
      .required()
      .uri()
      .custom((value, helper) => {
        const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gm;
        if (!value.match(regExp)) {
          return helper.message('Поле "image" содержит некорректные данные');
        }
        return value;
      })
      .messages({
        'string.empty': 'Поле "image" должно быть заполнено',
        'any.required': 'Поле "image" обязательное для заполнения',
      }),
    trailer: Joi.string()
      .required()
      .uri()
      .custom((value, helper) => {
        const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gm;
        if (!value.match(regExp)) {
          return helper.message('Поле "trailer" содержит некорректные данные');
        }
        return value;
      })
      .messages({
        'string.empty': 'Поле "trailer" должно быть заполнено',
        'any.required': 'Поле "trailer" обязательное для заполнения',
      }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string()
      .required()
      .uri()
      .custom((value, helper) => {
        const regExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gm;
        if (!value.match(regExp)) {
          return helper.message(
            'Поле "thumbnail" содержит некорректные данные',
          );
        }
        return value;
      })
      .messages({
        'string.empty': 'Поле "thumbnail" должно быть заполнено',
        'any.required': 'Поле "thumbnail" обязательное для заполнения',
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
