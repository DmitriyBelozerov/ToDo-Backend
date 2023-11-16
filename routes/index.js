const router = require('express').Router();

const itemTodoRouter = require('./itemsTodo');

const NotFoundError = require('../errors/not-found-err');
const { message404 } = require('../constants/constants');

router.use('/itemTodo', itemTodoRouter);

router.use('*', (req, res, next) => next(new NotFoundError(message404)));

module.exports = router;
