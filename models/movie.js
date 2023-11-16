const mongoose = require('mongoose');

const itemTodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', itemTodoSchema);
