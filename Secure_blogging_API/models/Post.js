const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 chars'],
    unique: true
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  tags: [{
    type: String,
    trim: true
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
