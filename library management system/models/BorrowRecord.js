const mongoose = require('mongoose');

const borrowRecordSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  dateBorrowed: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BorrowRecord', borrowRecordSchema);
