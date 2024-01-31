const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    // unique: true,
  },
  text: {
    type: String,
    required: true
  }
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;

