const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Book', bookSchema);
