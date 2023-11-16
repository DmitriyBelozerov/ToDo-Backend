const ItemTodo = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const {
  messageIncorrectDataCreateMovie, messageMovieNotFound,
  messageIncorrectDataDeleteMovie,
} = require('../constants/constants');

const NO_ERRORS = 200;
const NO_ERRORS_CREATED = 201;

const getItemsTodo = (req, res, next) => {
  ItemTodo.find({})
    .populate(['owner'])
    .then((movies) => {
      res.status(NO_ERRORS).send({
        data: movies.filter((movie) => movie.owner.equals(req.user._id)),
      });
    })
    .catch(next);
};

const createItemTodo = (req, res, next) => {
  const {
    name,
  } = req.body;
  ItemTodo.create({
    name,
  })
    .then((itemTodo) => {
      res.status(NO_ERRORS_CREATED).send({ data: itemTodo });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(messageIncorrectDataCreateMovie));
      } else {
        next(err);
      }
    });
};

const deleteItemTodo = (req, res, next) => {
  ItemTodo.findById(req.params._id)
    .then((item) => {
      if (!item) {
        throw new NotFoundError(messageMovieNotFound);
      } else {
        item.remove()
          .then(() => {
            res.status(NO_ERRORS).send({ data: item });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(messageIncorrectDataDeleteMovie));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getItemsTodo, createItemTodo, deleteItemTodo,
};
