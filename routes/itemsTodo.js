const router = require('express').Router();
const { validationCreateMovie } = require('../utils/validation');

const {
  getItemsTodo, createItemTodo, deleteItemTodo,
} = require('../controllers/movies');

router.get('/', getItemsTodo);

router.post(
  '/',
  validationCreateMovie,
  createItemTodo,
);

router.delete(
  '/:_id',
  deleteItemTodo,
);

module.exports = router;
