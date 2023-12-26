// models/Kid.js
const mongoose = require('mongoose');

const kidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  behavior: [{
    date: {
      type: Date,
      default: Date.now
    },
    rating: {
      type: String,
      enum: ['good', 'bad', 'neutral'],
      default: 'neutral'
    },
    comment: String
  }]
});

const Kid = mongoose.model('Kid', kidSchema);

module.exports = Kid;
