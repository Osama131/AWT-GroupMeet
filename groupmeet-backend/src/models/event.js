const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: false
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: false,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
