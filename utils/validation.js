const { celebrate, Joi } = require('celebrate');

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
});

module.exports = {
  validationCreateMovie,
};
